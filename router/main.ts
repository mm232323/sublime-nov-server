import express from "express";
import { client } from "../util/database";
const router = express.Router();
const db = client.db("Sublime_Nov")
const audiosTypes = db.collection("audioTypes");
const reports = db.collection("reports")
const messages = db.collection("messages")
router.get("/about/audios", async (req, res, next) => {
  const audios = await audiosTypes.find({}).toArray();
  res.send(JSON.stringify(audios))
});

router.post("/report",async (req,res,next) => {
  const report = req.body
  await reports.insertOne(report)
  res.json(JSON.stringify({message:"THE REPORT SENT SECCUSSFULLY"}))
})

router.post("/contactMessage",async (req,res,next) => {
  const message = req.body
  await messages.insertOne(message)
  res.json(JSON.stringify({message:"THE MESSAGE SENT SECCUSSFULLY"}))
})

export default router;
