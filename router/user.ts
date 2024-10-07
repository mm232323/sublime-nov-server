import express from "express";
import * as userController from "../controllers/user";
import path from "path";
const router = express.Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../output/avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.post("/get-user", userController.getUser);

router.post("/get-user-byId", userController.getUserById);

router.post(
  "/set-avatar/:Email",
  upload.single("image"),
  userController.setAvatar
);
router.post("/get-avatar", userController.getAvatar);

router.post("/get-rank", userController.getRank);

router.post("/get-medals", userController.getMedals);

router.post("/handle-follow", userController.handleFollowing);

router.post("/get-id", userController.getId);

router.post("/get-fav", userController.getFav);

export default router;
