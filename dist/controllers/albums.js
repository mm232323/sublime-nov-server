"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAudio = exports.setImage = exports.postAlbum = exports.handleReport = exports.handleSave = exports.handleLike = exports.getAlbum = exports.getAllAllbums = void 0;
const Albums_1 = __importDefault(require("../models/Albums"));
const User_1 = __importDefault(require("../models/User"));
const path_1 = __importDefault(require("path"));
const getAllAllbums = async (req, res, next) => {
    const albums = await Albums_1.default.getAlbums();
    res.send(JSON.stringify({ albums }));
};
exports.getAllAllbums = getAllAllbums;
const getAlbum = async (req, res, next) => {
    const id = req.body.id;
    const album = await Albums_1.default.getAlbum({ id });
    res.json(album);
};
exports.getAlbum = getAlbum;
const handleLike = async (req, res, next) => {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (await User_1.default.getUser({ userId }));
    if (user.likes.includes(id)) {
        user.likes = user.likes.filter((likeId) => likeId !== id);
        await Albums_1.default.update({ id }, { $inc: { likes: -1 } });
    }
    else {
        user.likes.push(id);
        await Albums_1.default.update({ id }, { $inc: { likes: 1 } });
    }
    await User_1.default.deleteUser({ userId });
    new User_1.default(user);
    res.json({ message: "likes handled successfully💖" });
};
exports.handleLike = handleLike;
const handleSave = async (req, res, next) => {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (await User_1.default.getUser({ userId }));
    if (user.saves.includes(id)) {
        user.saves = user.saves.filter((saveId) => saveId !== id);
    }
    else {
        user.saves.push(id);
    }
    await User_1.default.deleteUser({ userId });
    new User_1.default(user);
    res.json({ message: "saving handled😊" });
};
exports.handleSave = handleSave;
const handleReport = async (req, res, next) => {
    const { albumId, userId, reportData } = req.body;
    await Albums_1.default.update({ id: albumId }, { $inc: { reports: 1 } });
    await User_1.default.update({ userId }, { $push: { reports: reportData } });
    res.json({ message: "report handled successfully😊" });
};
exports.handleReport = handleReport;
const postAlbum = async (req, res, next) => {
    const album = req.body.album;
    const email = req.body.email;
    await User_1.default.update({ email }, { $push: { albums: album } });
    new Albums_1.default(album);
    res.json({ message: "album create successfully📀" });
};
exports.postAlbum = postAlbum;
const setImage = async (req, res, next) => {
    const file = req.file;
    const email = req.params.email;
    const albumId = req.params.albumId;
    const user = (await User_1.default.getUser({ email }));
    user.albums = user.albums.map((album) => {
        if (album.id == albumId) {
            album.imgUrl = file?.filename + path_1.default.extname(file?.originalname);
        }
        return album;
    });
    await User_1.default.deleteUser({ email });
    new User_1.default(user);
    const album = (await Albums_1.default.getAlbum({ id: albumId }));
    album.imgUrl = file?.filename;
    await Albums_1.default.deleteAlbum({ id: albumId });
    new Albums_1.default(album);
    console.log("============================");
    console.log("============================");
    console.log("============================");
    console.log(user);
    console.log("============================");
    console.log(album);
    console.log("============================");
    console.log("============================");
    console.log("============================");
    res.json({ message: "Album Img Handled Successfully🌄" });
};
exports.setImage = setImage;
const setAudio = async (req, res, next) => {
    const file = req.file;
    const email = req.params.email;
    const user = (await User_1.default.getUser({ email }));
    const albumId = req.params.albumId;
    user.albums.map((album) => {
        if (album.id == albumId) {
            album.audioUrl = file?.filename + path_1.default.extname(file?.originalname);
        }
        return album;
    });
    await User_1.default.deleteUser({ email });
    new User_1.default(user);
    const album = (await Albums_1.default.getAlbum({ id: albumId }));
    album.audioUrl = file?.filename;
    await Albums_1.default.deleteAlbum({ id: albumId });
    new Albums_1.default(album);
    console.log("============================");
    console.log("============================");
    console.log("============================");
    console.log(user);
    console.log("============================");
    console.log(album);
    console.log("============================");
    console.log("============================");
    console.log("============================");
    res.json({ message: "Album audio Handled Successfully🔊" });
};
exports.setAudio = setAudio;
