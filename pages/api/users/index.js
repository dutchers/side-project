import db from "../../../db/models/index.js";

const { user } = db;

export default async function (req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const users = await user.findAll({
        attributes: ["name", "email", "id", "role"],
      });
      res.status(200).json(users);
      break;
    case "PUT":
      console.log("put");
      res.status(200);
      break;
    default:
      res.status(404);
      break;
  }
}
