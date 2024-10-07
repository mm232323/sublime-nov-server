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
exports.getUser = exports.postUser = exports.checkUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const selectedEmail = yield User_1.default.getUser({ email });
    if (selectedEmail == null)
        return res.json(JSON.stringify({ isExist: false }));
    return res.json(JSON.stringify({ isExist: true }));
});
exports.checkUser = checkUser;
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user.albums = [];
    user.medals = [];
    user.avatarName = "";
    user.followers = 0;
    user.follows = [];
    user.likes = [];
    user.reports = [];
    user.saves = [];
    const id = yield bcrypt_1.default.hash(user.email, 20);
    user.id = id;
    new User_1.default(user);
    res.json(JSON.stringify({ message: "NEW USER CREATED SECCUSSFULLY😊" }));
});
exports.postUser = postUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield User_1.default.getUser({ email });
    res.json(JSON.stringify(user));
});
exports.getUser = getUser;
