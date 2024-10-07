import { RequestHandler } from "express";
import Albums from "../models/Albums";
import User from "../models/User";
export const getAllAllbums: RequestHandler = async (req, res, next) => {
  const albums = await Albums.getAlbums();
  res.send(JSON.stringify({ albums }));
};

export const getAlbum: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const album = await Albums.getAlbum({ id });
  res.json(album);
};

export const handleLike: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const user = (await User.getUser({ userId }))!;
  if (user.likes.includes(id)) {
    user.likes = user.likes.filter((likeId: string) => likeId !== id);
    await Albums.update({ id }, { $inc: { likes: -1 } });
  } else {
    user.likes.push(id);
    await Albums.update({ id }, { $inc: { likes: 1 } });
  }
  await User.deleteUser({ userId });
  new User(user);
  res.json({ message: "likes handled successfully💖" });
};

export const handleSave: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const user = (await User.getUser({ userId }))!;
  if (user.saves.includes(id)) {
    user.saves = user.saves.filter((saveId: number) => saveId !== id);
  } else {
    user.saves.push(id);
  }
  await User.deleteUser({ userId });
  new User(user);
  res.json({ message: "saving handled😊" });
};

export const handleReport: RequestHandler = async (req, res, next) => {
  const { albumId, userId, reportData } = req.body;
  await Albums.update({ id: albumId }, { $inc: { reports: 1 } });
  await User.update({ userId }, { $push: { reports: reportData } });
  res.json({ message: "report handled successfully😊" });
};

export const postAlbum: RequestHandler = async (req, res, next) => {
  const album = req.body.album;
  const email = req.body.email;
  await User.update({ email }, { $push: { albums: album } });
  new Albums(album);
  res.json({ message: "album create successfully📀" });
};

export const setImage: RequestHandler = async (req, res, next) => {
  const file = req.file;
  res.json({ message: "Album Img Handled Successfully🌄" });
};

export const setAudio: RequestHandler = async (req, res, next) => {
  const file = req.file;
  res.json({ message: "Album audio Handled Successfully🔊" });
};
