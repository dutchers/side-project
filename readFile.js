const fs = require("node:fs");
const { ConsoleMessage } = require("puppeteer");
const { json } = require("sequelize");

const data = [
  { a: "b", c: "d" },
  { a: "b", c: "d" },
  { a: "b", c: "d" },
];

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

buildJson("myfile.json", data);
