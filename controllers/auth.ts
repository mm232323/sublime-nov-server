import { RequestHandler } from "express";
import db from "../lib/db";
import bcrypt from "bcrypt";
import User from "../models/User";

export const checkUser: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const selectedEmail = await User.getUser({ email });
  if (selectedEmail == null)
    return res.json(JSON.stringify({ isExist: false }));
  return res.json(JSON.stringify({ isExist: true }));
};

export const postUser: RequestHandler = async (req, res, next) => {
  const user = req.body;
  user.albums = [];
  user.medals = [];
  user.avatarName = "";
  user.followers = 0;
  user.follows = [];
  user.likes = [];
  user.reports = [];
  user.saves = [];
  const id = await bcrypt.hash(user.email, 20);
  user.id = id;
  new User(user);
  res.json(JSON.stringify({ message: "NEW USER CREATED SECCUSSFULLY😊" }));
};

export const getUser: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.getUser({ email });
  res.json(JSON.stringify(user));
};
