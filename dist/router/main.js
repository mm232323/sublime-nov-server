"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../lib/db"));
const router = express_1.default.Router();
const audiosTypes = db_1.default.collection("audioTypes");
const reports = db_1.default.collection("reports");
const messages = db_1.default.collection("messages");
router.get("/about/audios", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const audios = yield audiosTypes.find({}).toArray();
    res.send(JSON.stringify(audios));
}));
router.post("/report", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const report = req.body;
    yield reports.insertOne(report);
    res.json(JSON.stringify({ message: "THE REPORT SENT SECCUSSFULLY😊" }));
}));
router.post("/contactMessage", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body;
    yield messages.insertOne(message);
    res.json(JSON.stringify({ message: "THE MESSAGE SENT SECCUSSFULLY😊" }));
}));
exports.default = router;
