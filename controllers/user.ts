import { RequestHandler } from "express";
import db from "../lib/db";
const allAlbumsCol = db.collection("allAlbums");
import User from "../models/User";
import Albums from "../models/Albums";
export const getUser: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.getUser({ email });
  res.send({ user });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const user = await User.getUser({ userId: id });
  res.send({ user });
};

export const setAvatar: RequestHandler = async (req, res, next) => {
  const avatar = req.file;
  const email = req.params.Email;
  const user = (await User.getUser({ email }))!;
  user.avatarName = avatar?.originalname;
  await User.deleteUser({ email });
  new User(user);
  return res.send(JSON.stringify({ message: "THE AVATAR CHANGED😊" }));
};

export const getAvatar: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = (await User.getUser({ email }))!;

  res.send(JSON.stringify({ avatar: user.avatarName }));
};

export const getRank: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const users = await User.getUsers();
  users.sort((a, b) => b.followers - a.followers);
  const user = (await User.getUser({ email }))!;
  let userIdx = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      userIdx = i;
      break;
    }
  }
  const prevU = userIdx == 0 ? null : users[userIdx - 1];
  const nextU = userIdx == users.length - 1 ? null : users[userIdx + 1];
  const selectedUsers = {
    user: [user, userIdx],
    prevU: [prevU, userIdx + 1],
    nextU: [nextU, userIdx - 1],
  };
  res.json(selectedUsers);
};

export const getMedals: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = (await User.getUser({ email }))!;
  res.json({ medals: user.medals });
};

export const handleFollowing: RequestHandler = async (req, res, next) => {
  const follower = req.body.follower;
  const followerUser = (await User.getUser({ userId: follower }))!;
  const following = req.body.following;
  const followingUser = (await User.getUser({ userId: following }))!;
  if (followerUser.follows.includes(following)) {
    followerUser.follows = followerUser.follows.filter(
      (follow: string) => follow !== following
    );
    followingUser.followers--;
  } else {
    followerUser.follows.push(following);
    followingUser.followers++;
  }
  let idx = 0;
  const medals = [
    "bronze",
    "silver",
    "gold",
    "diamond",
    "gem",
    "pearl",
    "kiawthwaite",
    "polonium",
  ];
  const follows = [12000, 50000, 100000, 500000, 1000000, 10000000, 50000000];
  const followingMedals = [];
  while (follows[idx] <= followingUser.followers) {
    followingMedals.push(medals[idx]);
    idx++;
  }
  followingUser.medals = followingMedals;
  await User.deleteUser({ userId: follower });
  await User.deleteUser({ userId: following });
  new User(followerUser);
  new User(followingUser);
  res.json({ message: "following handled successfully😊" });
};

export const getId: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = (await User.getUser({ email }))!;
  res.json({ id: user.userId });
};

export const getFav: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = (await User.getUser({ email }))!;
  const albumsCursor = await Albums.getAlbums();
  const favAlbums = [];
  for (let i = 0; i < albumsCursor.length; i++) {
    if (user.saves.includes(albumsCursor[i].id))
      favAlbums.push(albumsCursor[i]);
  }
  res.json({ albums: favAlbums });
};
