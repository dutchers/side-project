import db from "../../../db/models/index.js";

const { user } = db;

export default async function (req, res) {
  const { method } = req;
  const id = req.query.user;
  const data = req.body;

  switch (method) {
    case "GET":
      try {
        const user = await user.findAll({
          attributes: ["name", "email", "id", "role"],
          where: { id },
        });
        res.status(200).json(user[0]);
      } catch (err) {
        res.status(500).json({ err });
      }
      break;
    case "PUT":
      try {
        await user.update(data, {
          where: {
            id,
          },
        });
        res.status(200).json({ message: "update successful" });
      } catch (err) {
        res.send(500).json({ message: err });
      }
      break;
    default:
      res.status(404);
      break;
  }
}
