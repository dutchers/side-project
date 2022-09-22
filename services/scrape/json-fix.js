const fs = require("node:fs");

const { readFileSync, writeFileSync } = fs;

const fixJson = () => {
  const file = readFileSync("eater-scrape-09-21-2022.json");
  const data = JSON.parse(file);

  let totalPlaces = 0;
  const fixedFile = data.map((item) => {
    const newPlaces = item.places.filter((place) => {
      return Object.keys(place).length > 1;
    });
    return { ...item, places: newPlaces };
  });

  const json = JSON.stringify(fixedFile, null, 2);

  writeFileSync("eater-scrape-09-21-2022-fixed.json", json);
};

const getPlaceIds = () => {
  const file = readFileSync("eater-scrape-09-21-2022-fixed.json");
  const data = JSON.parse(file);

  const withPlaceIds = data.map((list) => {
    return {
      ...list,
      places: list.places.map((place) => {
        const urlSplit = place.googleUrl.split(/&|=/);
        const placeId = urlSplit.includes("query_place_id")
          ? urlSplit.at(-1)
          : undefined;
        return { ...place, placeId };
      }),
    };
  });

  const json = JSON.stringify(withPlaceIds, null, 2);

  writeFileSync("eater-scrape-09-21-2022-fixed.json", json);
};

getPlaceIds();
