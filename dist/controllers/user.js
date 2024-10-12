"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFav = exports.getId = exports.handleFollowing = exports.getMedals = exports.getRank = exports.getAvatar = exports.setAvatar = exports.getUserById = exports.getUser = void 0;
const db_1 = __importDefault(require("../lib/db"));
const allAlbumsCol = db_1.default.collection("allAlbums");
const User_1 = __importDefault(require("../models/User"));
const Albums_1 = __importDefault(require("../models/Albums"));
const getUser = async (req, res, next) => {
    const email = req.body.email;
    const user = await User_1.default.getUser({ email });
    res.send({ user });
};
exports.getUser = getUser;
const getUserById = async (req, res, next) => {
    const id = req.body.id;
    const user = await User_1.default.getUser({ userId: id });
    res.send({ user });
};
exports.getUserById = getUserById;
const setAvatar = async (req, res, next) => {
    const avatar = req.file;
    const email = req.params.Email;
    const user = (await User_1.default.getUser({ email }));
    user.avatarName = avatar?.filename;
    await User_1.default.deleteUser({ email });
    new User_1.default(user);
    return res.send(JSON.stringify({ message: "THE AVATAR CHANGED😊" }));
};
exports.setAvatar = setAvatar;
const getAvatar = async (req, res, next) => {
    const email = req.body.email;
    const user = (await User_1.default.getUser({ email }));
    res.send(JSON.stringify({ avatar: user.avatarName }));
};
exports.getAvatar = getAvatar;
const getRank = async (req, res, next) => {
    const email = req.body.email;
    const users = await User_1.default.getUsers();
    users.sort((a, b) => b.followers - a.followers);
    const user = (await User_1.default.getUser({ email }));
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
exports.getRank = getRank;
const getMedals = async (req, res, next) => {
    const email = req.body.email;
    const user = (await User_1.default.getUser({ email }));
    res.json({ medals: user.medals });
};
exports.getMedals = getMedals;
const handleFollowing = async (req, res, next) => {
    const follower = req.body.follower;
    const followerUser = (await User_1.default.getUser({ userId: follower }));
    const following = req.body.following;
    const followingUser = (await User_1.default.getUser({ userId: following }));
    if (followerUser.follows.includes(following)) {
        followerUser.follows = followerUser.follows.filter((follow) => follow !== following);
        followingUser.followers--;
    }
    else {
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
    await User_1.default.deleteUser({ userId: follower });
    await User_1.default.deleteUser({ userId: following });
    new User_1.default(followerUser);
    new User_1.default(followingUser);
    res.json({ message: "following handled successfully😊" });
};
exports.handleFollowing = handleFollowing;
const getId = async (req, res, next) => {
    const email = req.body.email;
    const user = (await User_1.default.getUser({ email }));
    res.json({ id: user.userId });
};
exports.getId = getId;
const getFav = async (req, res, next) => {
    const email = req.body.email;
    const user = (await User_1.default.getUser({ email }));
    const albumsCursor = await Albums_1.default.getAlbums();
    const favAlbums = [];
    for (let i = 0; i < albumsCursor.length; i++) {
        if (user.saves.includes(albumsCursor[i].id))
            favAlbums.push(albumsCursor[i]);
    }
    res.json({ albums: favAlbums });
};
exports.getFav = getFav;
