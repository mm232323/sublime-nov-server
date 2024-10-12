"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.postUser = exports.checkUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const checkUser = async (req, res, next) => {
    const email = req.body.email;
    const selectedEmail = await User_1.default.getUser({ email });
    if (selectedEmail == null)
        return res.json(JSON.stringify({ isExist: false }));
    return res.json(JSON.stringify({ isExist: true }));
};
exports.checkUser = checkUser;
const postUser = async (req, res, next) => {
    const user = req.body;
    user.albums = [];
    user.medals = [];
    user.avatarName = "";
    user.followers = 0;
    user.follows = [];
    user.likes = [];
    user.reports = [];
    user.saves = [];
    const id = (await bcrypt_1.default.hash(user.email, 20));
    user.userId = id
        .replaceAll(".", "")
        .replaceAll("$", "")
        .replaceAll("/", "")
        .replaceAll("&", "");
    new User_1.default(user);
    res.json(JSON.stringify({ message: "NEW USER CREATED SECCUSSFULLY😊" }));
};
exports.postUser = postUser;
const getUser = async (req, res, next) => {
    const email = req.body.email;
    const user = await User_1.default.getUser({ email });
    res.json(JSON.stringify(user));
};
exports.getUser = getUser;
