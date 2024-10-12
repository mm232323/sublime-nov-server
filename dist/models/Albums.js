"use strict";
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
        const postAlbum = async () => await albums.insertOne(this.album);
        postAlbum();
    }
    static async getAlbums() {
        const albumsCursor = await albums.find().toArray();
        let albumsArr = [];
        for (const album of albumsCursor) {
            albumsArr.push(album);
        }
        return albumsArr;
    }
    static async getAlbum(query) {
        const album = await albums.findOne(query);
        console.log(query);
        return album;
    }
    static async update(searchQ, updateQ) {
        await albums.updateOne(searchQ, updateQ);
        return "Album Updated";
    }
    static async deleteAlbum(query) {
        await albums.deleteOne(query);
        return "Album Deleted";
    }
}
exports.default = Albums;
