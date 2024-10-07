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
const db_1 = __importDefault(require("../lib/db"));
const albums = db_1.default.collection("allAlbums");
const usersCol = db_1.default.collection("users");
class Albums {
    constructor(album) {
        this.album = null;
        this.album = album;
        const postAlbum = () => __awaiter(this, void 0, void 0, function* () { return yield albums.insertOne(this.album); });
        postAlbum();
    }
    static getAlbums() {
        return __awaiter(this, void 0, void 0, function* () {
            const albumsCursor = yield albums.find().toArray();
            let albumsArr = [];
            for (const album of albumsCursor) {
                albumsArr.push(album);
            }
            return albumsArr;
        });
    }
    static getAlbum(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield albums.findOne(query);
            return album;
        });
    }
    static update(searchQ, updateQ) {
        return __awaiter(this, void 0, void 0, function* () {
            yield albums.updateOne(searchQ, updateQ);
            return "Album Updated";
        });
    }
    static deleteAlbum(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield albums.deleteOne(query);
            return "Album Deleted";
        });
    }
}
exports.default = Albums;
