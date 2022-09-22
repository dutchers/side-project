const fs = require("fs");
const puppeteer = require("puppeteer");

const TODAY = new Date();

const getFormattedDate = (date) => {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return `${month}-${day}-${year}`;
};

const buildJson = (filename, data) => {
  fs.open(filename, "r+", (err, fd) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("myfile does not exist");
        const json = JSON.stringify(data, null, 2);

        try {
          fs.writeFileSync(filename, json);
        } catch (err) {
          throw new Error(err);
        }
      }
      return;
    }

    try {
      const file = fs.readFileSync(filename);
      let parsed = JSON.parse(file);
      parsed = [...parsed, ...data];
      const json = JSON.stringify(parsed, null, 2);

      fs.writeFileSync(filename, json, (err) => {
        if (err) {
          console.log("ERR", err);
        }
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      fs.close(fd);
    }
  });
};

const FORMATTED_DATE = getFormattedDate(TODAY);
const BASE_URL = "https://ny.eater.com/maps/archives/";
const FILE_NAME = `eater-scrape-${FORMATTED_DATE}.json`;
const NUM_PAGES = 5;

async function scrape() {
  try {
    console.log("launching browser...");
    const browser = await puppeteer.launch({});

    console.log("opening new page...");
    const page = await browser.newPage();

    const pages = [...Array(NUM_PAGES).keys()];

    for (let item of pages) {
      if (item !== undefined) {
        let collection = [];

        console.log(`Navigating to page ${item + 1}`);
        await page.goto(`${BASE_URL}${item + 1}`);

        console.log(`Getting list of maps on page ${item + 1}`);
        const maps = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll(".c-entry-box--compact__title > a"),
            (element) => {
              return { title: element.textContent, href: element.href };
            }
          )
        );

        for (let map of maps) {
          const { title, href } = map;
          let list = { title, href };

          console.log(`Navigating to ${title}`);
          await page.goto(href);

          const places = await page.evaluate(() => {
            const container = document.querySelector(".c-mapstack__cards");

            return Array.from(
              container.querySelectorAll(".c-mapstack__card"),
              (el) => {
                const title = el.querySelector("h1")
                  ? el.querySelector("h1").textContent
                  : undefined;

                const addressLink = el.querySelector(".c-mapstack__address a");
                const googleUrl = addressLink ? addressLink.href : undefined;
                const formattedAddress = addressLink
                  ? addressLink.textContent
                  : undefined;
                return { title, googleUrl, formattedAddress };
              }
            ).map((item) => {
              const newPlaces = item.places.filter((place) => {
                return Object.keys(place).length > 1;
              });
              return { ...item, places: newPlaces };
            });
          });

          console.log(
            `Adding ${places.length} new restaurants to the collection...`
          );
          list = { ...list, places };

          collection = [...collection, list];
        }

        buildJson(FILE_NAME, collection);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing browser...");
    browser.close();
  }
}
scrape();
