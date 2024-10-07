import { MongoDBNamespace, WithId } from "mongodb";
import { albumType } from "../util/types";
import db from "../lib/db";
const albums = db.collection("allAlbums");
const usersCol = db.collection("users");
class Albums {
  album: WithId<Document> | null = null;
  constructor(album: WithId<Document> | null) {
    this.album = album;
    const postAlbum = async () => await albums.insertOne(this.album!);
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

  static async getAlbum(query: Object) {
    const album = await albums.findOne(query);
    return album;
  }

  static async update(searchQ: Object, updateQ: Object) {
    await albums.updateOne(searchQ, updateQ);
    return "Album Updated";
  }

  static async deleteAlbum(query: object) {
    await albums.deleteOne(query);
    return "Album Deleted";
  }
}
export default Albums;
