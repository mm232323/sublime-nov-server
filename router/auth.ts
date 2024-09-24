import express from "express";
import { client } from "../util/database";
const db = client.db("Sublime_Nov");
const users = db.collection("users");
const router = express.Router();
router.post("/check-user", async (req, res, next) => {
  const email = req.body.email;
  const selectedEmail = await users.findOne({ email });
  if (selectedEmail == null)
    return res.json(JSON.stringify({ isExist: false }));
  return res.json(JSON.stringify({ isExist: true }));
});
router.post("/new-user", async (req, res, next) => {
  const user = req.body;
  await users.insertOne(user);
  res.json(JSON.stringify({ message: "NEW USER CREATED SECCUSSFULLY" }));
});

router.post("/get-user", async (req, res, next) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  res.json(JSON.stringify(user));
});
export default router;
