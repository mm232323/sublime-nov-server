import express from "express";
import db from "../lib/db";
const router = express.Router();
const allAlbumsCol = db.collection("allAlbums");
const usersCol = db.collection("users");
import multer from "multer";
import path from "path";
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../output/albums"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imgUpload = multer({
  storage: imgStorage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../output/albums"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const audioUpload = multer({
  storage: audioStorage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.get("/random-albums", async (req, res, next) => {
  const albumsCursor = await allAlbumsCol.find().toArray();
  let albums = [];
  for (const album of albumsCursor) {
    albums.push(album);
  }
  res.send(JSON.stringify({ albums }));
});

router.post("/get-album", async (req, res, next) => {
  const id = req.body.id;
  const album = await allAlbumsCol.findOne({ id });
  res.json(album);
});

router.post("/handle-like", async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const user = (await usersCol.findOne({ userId }))!;
  if (user.likes.includes(id)) {
    user.likes = user.likes.filter((likeId: string) => likeId !== id);
    await allAlbumsCol.updateOne({ id }, { $inc: { likes: -1 } });
  } else {
    user.likes.push(id);
    await allAlbumsCol.updateOne({ id }, { $inc: { likes: 1 } });
  }
  await usersCol.deleteOne({ userId });
  await usersCol.insertOne(user);
  res.json({ message: "likes handled successfully💖" });
});

router.post("/handle-save", async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const user = (await usersCol.findOne({ userId }))!;
  if (user.saves.includes(id)) {
    user.saves = user.saves.filter((saveId: number) => saveId !== id);
  } else {
    user.saves.push(id);
  }
  await usersCol.deleteOne({ userId });
  await usersCol.insertOne(user);
  res.json({ message: "saving handled😊" });
});
router.post("/handle-report", async (req, res, next) => {
  const { albumId, userId, reportData } = req.body;
  await allAlbumsCol.updateOne({ id: albumId }, { $inc: { reports: 1 } });
  await usersCol.updateOne({ userId }, { $push: { reports: reportData } });
  res.json({ message: "report handled successfully😊" });
});

router.post("/create-album", async (req, res, next) => {
  const album = req.body.album;
  const email = req.body.email;
  await usersCol.updateOne({ email }, { $push: { albums: album } });
  await allAlbumsCol.insertOne(album);
  res.json({ message: "album create successfully📀" });
});
router.post(
  "/handle-img",
  imgUpload.single("image"),
  async (req, res, next) => {
    const file = req.file;
    res.json({ message: "Album Img Handled Successfully🌄" });
  }
);
router.post(
  "/handle-audio",
  audioUpload.single("audio"),
  async (req, res, next) => {
    const file = req.file;
    res.json({ message: "Album audio Handled Successfully🔊" });
  }
);
export default router;
