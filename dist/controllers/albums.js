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
exports.setAudio = exports.setImage = exports.postAlbum = exports.handleReport = exports.handleSave = exports.handleLike = exports.getAlbum = exports.getAllAllbums = void 0;
const Albums_1 = __importDefault(require("../models/Albums"));
const User_1 = __importDefault(require("../models/User"));
const getAllAllbums = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const albums = yield Albums_1.default.getAlbums();
    res.send(JSON.stringify({ albums }));
});
exports.getAllAllbums = getAllAllbums;
const getAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const album = yield Albums_1.default.getAlbum({ id });
    res.json(album);
});
exports.getAlbum = getAlbum;
const handleLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (yield User_1.default.getUser({ userId }));
    if (user.likes.includes(id)) {
        user.likes = user.likes.filter((likeId) => likeId !== id);
        yield Albums_1.default.update({ id }, { $inc: { likes: -1 } });
    }
    else {
        user.likes.push(id);
        yield Albums_1.default.update({ id }, { $inc: { likes: 1 } });
    }
    yield User_1.default.deleteUser({ userId });
    new User_1.default(user);
    res.json({ message: "likes handled successfully💖" });
});
exports.handleLike = handleLike;
const handleSave = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (yield User_1.default.getUser({ userId }));
    if (user.saves.includes(id)) {
        user.saves = user.saves.filter((saveId) => saveId !== id);
    }
    else {
        user.saves.push(id);
    }
    yield User_1.default.deleteUser({ userId });
    new User_1.default(user);
    res.json({ message: "saving handled😊" });
});
exports.handleSave = handleSave;
const handleReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId, userId, reportData } = req.body;
    yield Albums_1.default.update({ id: albumId }, { $inc: { reports: 1 } });
    yield User_1.default.update({ userId }, { $push: { reports: reportData } });
    res.json({ message: "report handled successfully😊" });
});
exports.handleReport = handleReport;
const postAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = req.body.album;
    const email = req.body.email;
    yield User_1.default.update({ email }, { $push: { albums: album } });
    new Albums_1.default(album);
    res.json({ message: "album create successfully📀" });
});
exports.postAlbum = postAlbum;
const setImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    res.json({ message: "Album Img Handled Successfully🌄" });
});
exports.setImage = setImage;
const setAudio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    res.json({ message: "Album audio Handled Successfully🔊" });
});
exports.setAudio = setAudio;
