import express from "express";
import { client } from "../util/database";
const router = express.Router();
const db = client.db("Sublime_Nov");
const albumsCol = db.collection("albums");

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get("/random-albums", async (req, res, next) => {
  const albumsTypes = await albumsCol.find().toArray();
  let albums = [];
  for (const albumType of albumsTypes) {
    for (const album of albumType.albums) {
      albums.push(album);
    }
  }
  // albums = shuffleArray(albums);
  res.send(JSON.stringify({ albums }));
});
export default router;
