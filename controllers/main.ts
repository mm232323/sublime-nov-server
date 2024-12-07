import { RequestHandler } from "express";
import db from "../lib/db";
import { validate } from "deep-email-validator";
const audiosTypes = db.collection("audioTypes");
const reports = db.collection("reports");
const messages = db.collection("messages");

export const getAudioTypes: RequestHandler = async (req, res, next) => {
  const audios = await audiosTypes.find({}).toArray();
  res.send(JSON.stringify(audios));
};

export const postReport: RequestHandler = async (req, res, next) => {
  const report = req.body;
  await reports.insertOne(report);
  res.json(JSON.stringify({ message: "THE REPORT SENT SECCUSSFULLY😊" }));
};

export const postContact: RequestHandler = async (req, res, next) => {
  const message = req.body;
  const emailValid = await validate(message.contactEmail);
  if (!emailValid.validators.mx?.valid)
    return res.json(JSON.stringify({ message: "email not valid" }));
  await messages.insertOne(message);
  res.json(JSON.stringify({ message: "THE MESSAGE SENT SECCUSSFULLY😊" }));
};
