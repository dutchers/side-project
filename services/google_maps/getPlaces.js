const path = require("path");
const db = require("../../db/models/index.js");
const eaterScrape = require("../scrape/eater-scrape-09-21-2022-fixed.json");
const { Client } = require("@googlemaps/google-maps-services-js");
const dotenv = require("dotenv").config({ path: ".env.local" });
const { GOOGLE_MAPS_API_KEY } = process.env;

const { Place, OpeningHours, List, ListPlace } = db;

const client = new Client({});

const PLACE_ID = "ChIJUw68EZJZwokRJ15RD_T4OTw";

const getAddressComponents = async (client, place_id) => {
  const args = {
    params: {
      key: GOOGLE_MAPS_API_KEY,
      place_id,
      fields: [
        "formatted_address",
        "geometry",
        "types",
        "name",
        "opening_hours",
        "place_id",
        "rating",
        "website",
        "url",
        "user_ratings_total",
        "price_level",
      ],
    },
  };

  try {
    const response = await client.placeDetails(args);
    return response.data.result;
  } catch (err) {
    console.log("There was an error fetching place data", err);
  }
};

const sample = eaterScrape.splice(1);

const savePlaces = async () => {
  for (let list of sample) {
    const { title, places } = list;
    const [listInstance, created] = await List.findOrCreate({
      where: {
        name: title,
      },
      defaults: {
        source: "eater",
      },
    });

    console.log(listInstance, "Instance ID");

    for (let place of places) {
      const { title, placeId } = place;
      const placeExists = !!(await Place.findOne({ where: { name: title } }));

      if (!placeExists) {
        const data = await getAddressComponents(client, placeId);

        if (data && data.business_status !== "CLOSED_PERMANENTLY") {
          const {
            formatted_address: formattedAddress,
            name,
            geometry,
            types,
            opening_hours,
            rating,
            website,
            url,
            user_ratings_total: userRatingsTotal,
            price_level: priceLevel,
          } = data;

          const newPlace = await Place.create({
            name,
            formattedAddress,
            placeId,
            rating,
            website,
            url,
            userRatingsTotal,
            priceLevel,
            lat: geometry.location.lat,
            lng: geometry.location.lng,
          });

          if (opening_hours?.periods) {
            for (period of opening_hours.periods) {
              const { open, close } = period;
              const newOpening = await OpeningHours.create({
                day: open?.day,
                open: open?.time,
                close: close?.time,
                PlaceId: newPlace.id,
              });
            }
          }

          await newPlace.addList(listInstance);
          await listInstance.addPlace(newPlace);
        }
      }
    }
  }
};

//getAddressComponents(client, PLACE_ID);

savePlaces();
