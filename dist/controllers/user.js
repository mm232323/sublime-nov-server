"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFav = exports.getId = exports.handleFollowing = exports.getMedals = exports.getRank = exports.getAvatar = exports.setAvatar = exports.getUserById = exports.getUser = void 0;
const db_1 = __importDefault(require("../lib/db"));
const allAlbumsCol = db_1.default.collection("allAlbums");
const User_1 = __importDefault(require("../models/User"));
const Albums_1 = __importDefault(require("../models/Albums"));
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield User_1.default.getUser({ email });
    res.send({ user });
});
exports.getUser = getUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const user = yield User_1.default.getUser({ userId: id });
    res.send({ user });
});
exports.getUserById = getUserById;
const setAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = req.file;
    const email = req.params.Email;
    const user = (yield User_1.default.getUser({ email }));
    user.avatarName = avatar === null || avatar === void 0 ? void 0 : avatar.originalname;
    yield User_1.default.deleteUser({ email });
    new User_1.default(user);
    return res.send(JSON.stringify({ message: "THE AVATAR CHANGED😊" }));
});
exports.setAvatar = setAvatar;
const getAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield User_1.default.getUser({ email }));
    res.send(JSON.stringify({ avatar: user.avatarName }));
});
exports.getAvatar = getAvatar;
const getRank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const users = yield User_1.default.getUsers();
    users.sort((a, b) => b.followers - a.followers);
    const user = (yield User_1.default.getUser({ email }));
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
});
exports.getRank = getRank;
const getMedals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield User_1.default.getUser({ email }));
    res.json({ medals: user.medals });
});
exports.getMedals = getMedals;
const handleFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = req.body.follower;
    const followerUser = (yield User_1.default.getUser({ userId: follower }));
    const following = req.body.following;
    const followingUser = (yield User_1.default.getUser({ userId: following }));
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
    yield User_1.default.deleteUser({ userId: follower });
    yield User_1.default.deleteUser({ userId: following });
    new User_1.default(followerUser);
    new User_1.default(followingUser);
    res.json({ message: "following handled successfully😊" });
});
exports.handleFollowing = handleFollowing;
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield User_1.default.getUser({ email }));
    res.json({ id: user.userId });
});
exports.getId = getId;
const getFav = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield User_1.default.getUser({ email }));
    const albumsCursor = yield Albums_1.default.getAlbums();
    const favAlbums = [];
    for (let i = 0; i < albumsCursor.length; i++) {
        if (user.saves.includes(albumsCursor[i].id))
            favAlbums.push(albumsCursor[i]);
    }
    res.json({ albums: favAlbums });
});
exports.getFav = getFav;
