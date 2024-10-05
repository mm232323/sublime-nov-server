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
const allAlbumsCol = db_1.default.collection("allAlbums");
const usersCol = db_1.default.collection("users");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imgStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../output/albums"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const imgUpload = (0, multer_1.default)({
    storage: imgStorage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});
const audioStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../output/albums"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const audioUpload = (0, multer_1.default)({
    storage: audioStorage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});
router.get("/random-albums", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const albumsCursor = yield allAlbumsCol.find().toArray();
    let albums = [];
    for (const album of albumsCursor) {
        albums.push(album);
    }
    res.send(JSON.stringify({ albums }));
}));
router.post("/get-album", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const album = yield allAlbumsCol.findOne({ id });
    res.json(album);
}));
router.post("/handle-like", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (yield usersCol.findOne({ userId }));
    if (user.likes.includes(id)) {
        user.likes = user.likes.filter((likeId) => likeId !== id);
        yield allAlbumsCol.updateOne({ id }, { $inc: { likes: -1 } });
    }
    else {
        user.likes.push(id);
        yield allAlbumsCol.updateOne({ id }, { $inc: { likes: 1 } });
    }
    yield usersCol.deleteOne({ userId });
    yield usersCol.insertOne(user);
    res.json({ message: "likes handled successfully💖" });
}));
router.post("/handle-save", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const userId = req.body.userId;
    const user = (yield usersCol.findOne({ userId }));
    if (user.saves.includes(id)) {
        user.saves = user.saves.filter((saveId) => saveId !== id);
    }
    else {
        user.saves.push(id);
    }
    yield usersCol.deleteOne({ userId });
    yield usersCol.insertOne(user);
    res.json({ message: "saving handled😊" });
}));
router.post("/handle-report", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId, userId, reportData } = req.body;
    yield allAlbumsCol.updateOne({ id: albumId }, { $inc: { reports: 1 } });
    yield usersCol.updateOne({ userId }, { $push: { reports: reportData } });
    res.json({ message: "report handled successfully😊" });
}));
router.post("/create-album", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = req.body.album;
    const email = req.body.email;
    yield usersCol.updateOne({ email }, { $push: { albums: album } });
    yield allAlbumsCol.insertOne(album);
    res.json({ message: "album create successfully📀" });
}));
router.post("/handle-img", imgUpload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    res.json({ message: "Album Img Handled Successfully🌄" });
}));
router.post("/handle-audio", audioUpload.single("audio"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    res.json({ message: "Album audio Handled Successfully🔊" });
}));
exports.default = router;
