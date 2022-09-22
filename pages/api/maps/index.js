import db from "../../../db/models/index.js";

const { Map } = db;

export default async function (req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const maps = await Map.findAll({
        attributes: ["name", "private"],
      });
      res.status(200).json(users);
      break;
    case "POST":
      console.log(req.body, "-----------------------------------------");
      const map = await Map.create({ ...req.body });
      const { dataValues } = map;
      console.log(map);
      res
        .status(200)
        .json({ message: "Map created successfully", id: dataValues.id });
      break;
    default:
      res.status(404);
      break;
  }
}
