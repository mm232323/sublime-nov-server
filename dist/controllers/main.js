"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContact = exports.postReport = exports.getAudioTypes = void 0;
const db_1 = __importDefault(require("../lib/db"));
const deep_email_validator_1 = require("deep-email-validator");
const audiosTypes = db_1.default.collection("audioTypes");
const reports = db_1.default.collection("reports");
const messages = db_1.default.collection("messages");
const getAudioTypes = async (req, res, next) => {
    const audios = await audiosTypes.find({}).toArray();
    res.send(JSON.stringify(audios));
};
exports.getAudioTypes = getAudioTypes;
const postReport = async (req, res, next) => {
    const report = req.body;
    await reports.insertOne(report);
    res.json(JSON.stringify({ message: "THE REPORT SENT SECCUSSFULLY😊" }));
};
exports.postReport = postReport;
const postContact = async (req, res, next) => {
    const message = req.body;
    const emailValid = await (0, deep_email_validator_1.validate)(message.contactEmail);
    if (!emailValid.validators.mx?.valid)
        return res.json(JSON.stringify({ message: "email not valid" }));
    await messages.insertOne(message);
    res.json(JSON.stringify({ message: "THE MESSAGE SENT SECCUSSFULLY😊" }));
};
exports.postContact = postContact;
