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
const database_1 = require("../util/database");
const router = express_1.default.Router();
const db = database_1.client.db("Sublime_Nov");
const albumsCol = db.collection("albums");
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
router.get("/random-albums", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const albumsTypes = yield albumsCol.find().toArray();
    let albums = [];
    for (const albumType of albumsTypes) {
        for (const album of albumType.albums) {
            albums.push(album);
        }
    }
    // albums = shuffleArray(albums);
    res.send(JSON.stringify({ albums }));
}));
exports.default = router;
