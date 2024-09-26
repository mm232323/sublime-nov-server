import express from "express";
import db from "../lib/db";
import path from "path";
const router = express.Router();
const usersCollection = db.collection("users");
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

router.post("/get-user", async (req, res, next) => {
  const email = req.body.email;
  const user = await usersCollection.findOne({ email });
  res.send({ user });
});

router.post("/get-user-byId", async (req, res, next) => {
  const id = req.body.id;
  const user = await usersCollection.findOne({ userId: id });
  res.send({ user });
});

router.post(
  "/set-avatar/:Email",
  upload.single("image"),
  async (req, res, next) => {
    const avatar = req.file;
    const email = req.params.Email;
    const user = (await usersCollection.findOne({ email }))!;
    user.avatarName = avatar?.originalname;
    await usersCollection.deleteOne({ email });
    await usersCollection.insertOne(user);
    return res.send(JSON.stringify({ message: "THE AVATAR CHANGED" }));
  }
);
router.post("/get-avatar", async (req, res, next) => {
  const email = req.body.email;
  const user = (await usersCollection.findOne({ email }))!;

  res.send(JSON.stringify({ avatar: user.avatarName }));
});
router.post("/get-rank", async (req, res, next) => {
  const email = req.body.email;
  const users = await usersCollection.find().toArray();
  users.sort((a, b) => b.followers - a.followers);
  const user = (await usersCollection.findOne({ email }))!;
  let userIdx = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      userIdx = i;
      break;
    }
  }
  const prevU = userIdx == users.length - 1 ? null : users[userIdx - 1];
  const nextU = userIdx == 0 ? null : users[userIdx + 1];
  res.json({
    user: [user, userIdx],
    prevU: [prevU, userIdx + 1],
    nextU: [nextU, userIdx - 1],
  });
});
router.post("/get-medals", async (req, res, next) => {
  const email = req.body.email;
  const user = (await usersCollection.findOne({ email }))!;
  res.json({ medals: user.medals });
});

router.post("/handle-follow", async (req, res, next) => {
  const follower = req.body.follower;
  const followerUser = (await usersCollection.findOne({ userId: follower }))!;
  const following = req.body.following;
  const followingUser = (await usersCollection.findOne({ userId: following }))!;
  if (followerUser.follows.includes(following)) {
    followerUser.follows = followerUser.follows.filter(
      (follow: string) => follow !== following
    );
    followingUser.followers--;
  } else {
    followerUser.follows.push(following);
    followingUser.followers++;
  }
  await usersCollection.deleteOne({ userId: follower });
  await usersCollection.deleteOne({ userId: following });
  await usersCollection.insertOne(followerUser);
  await usersCollection.insertOne(followingUser);
  res.json({ message: "following handled successfully" });
});
router.post("/get-id", async (req, res, next) => {
  const email = req.body.email;
  const user = (await usersCollection.findOne({ email }))!;
  res.json({ id: user.userId });
});
export default router;
