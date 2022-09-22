import db from "../../../db/models/index.js";

const { Map } = db;

export default async function (req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      console.log("-------------------", req.query);
      if (req.query.map !== "undefined") {
        const result = await Map.findAll({
          attributes: ["name", "private"],
          where: { id: req.query.map },
        });
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no id provided" });
      }
      break;
    case "POST":
      const map = await Map.create({ ...req.body });
      const { dataValues } = map;
      res
        .status(200)
        .json({ message: "Map created successfully", id: dataValues.id });
      break;
    default:
      res.status(404);
      break;
  }
}
