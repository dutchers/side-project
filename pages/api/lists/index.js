import db from "../../../db/models/index.js";

const { List } = db;

export default async function (req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const lists = await List.findAll({
        attributes: ["name", "createdAt"],
      });
      res.status(200).json(lists);
      break;
    case "POST":
      console.log(req.body, "-----------------------------------------");
      const list = await List.create({ ...req.body });

      res
        .status(200)
        .json({ message: "List created successfully", id: list.id });
      break;
    default:
      res.status(404);
      break;
  }
}
