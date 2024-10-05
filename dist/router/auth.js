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
const users = db_1.default.collection("users");
const router = express_1.default.Router();
router.post("/check-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const selectedEmail = yield users.findOne({ email });
    if (selectedEmail == null)
        return res.json(JSON.stringify({ isExist: false }));
    return res.json(JSON.stringify({ isExist: true }));
}));
router.post("/new-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user.albums = [];
    user.medals = [];
    user.avatarName = "";
    user.followers = 0;
    yield users.insertOne(user);
    res.json(JSON.stringify({ message: "NEW USER CREATED SECCUSSFULLY😊" }));
}));
router.post("/get-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield users.findOne({ email });
    res.json(JSON.stringify(user));
}));
exports.default = router;
