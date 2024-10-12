import express from "express";
const router = express.Router();
import * as albumsController from "../controllers/albums";
import multer from "multer";
import path from "path";
import Albums from "../models/Albums";
import { WithId } from "mongodb";
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../output/albums"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "--" + Date.now());
  },
});

const imgUpload = multer({
  storage: imgStorage,
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../output/albums"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "--" + Date.now());
  },
});

const audioUpload = multer({
  storage: audioStorage,
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
});

router.get("/random-albums", albumsController.getAllAllbums);

router.post("/get-album", albumsController.getAlbum);

router.post("/handle-like", albumsController.handleLike);

router.post("/handle-save", albumsController.handleSave);

router.post("/handle-report", albumsController.handleReport);

router.post("/create-album", albumsController.postAlbum);

router.post(
  "/handle-img/:email/:albumId",
  imgUpload.single("image"),
  albumsController.setImage
);

router.post(
  "/handle-audio/:email/:albumId",
  audioUpload.single("audio"),
  albumsController.setAudio
);

export default router;
