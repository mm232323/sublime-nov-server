"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const albumsController = __importStar(require("../controllers/albums"));
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
router.get("/random-albums", albumsController.getAllAllbums);
router.post("/get-album", albumsController.getAlbum);
router.post("/handle-like", albumsController.handleLike);
router.post("/handle-save", albumsController.handleSave);
router.post("/handle-report", albumsController.handleReport);
router.post("/create-album", albumsController.postAlbum);
router.post("/handle-img", imgUpload.single("image"), albumsController.setImage);
router.post("/handle-audio", audioUpload.single("audio"), albumsController.setAudio);
exports.default = router;
