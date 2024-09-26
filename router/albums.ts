import express from "express";
import db from "../lib/db";
const router = express.Router();
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
