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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../lib/db"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const usersCollection = db_1.default.collection("users");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../output/avatars"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});
router.post("/get-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield usersCollection.findOne({ email });
    res.send({ user });
}));
router.post("/get-user-byId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const user = yield usersCollection.findOne({ userId: id });
    res.send({ user });
}));
router.post("/set-avatar/:Email", upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = req.file;
    const email = req.params.Email;
    const user = (yield usersCollection.findOne({ email }));
    user.avatarName = avatar === null || avatar === void 0 ? void 0 : avatar.originalname;
    yield usersCollection.deleteOne({ email });
    yield usersCollection.insertOne(user);
    return res.send(JSON.stringify({ message: "THE AVATAR CHANGED😊" }));
}));
router.post("/get-avatar", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield usersCollection.findOne({ email }));
    res.send(JSON.stringify({ avatar: user.avatarName }));
}));
router.post("/get-rank", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const users = yield usersCollection.find().toArray();
    users.sort((a, b) => b.followers - a.followers);
    const user = (yield usersCollection.findOne({ email }));
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
}));
router.post("/get-medals", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield usersCollection.findOne({ email }));
    res.json({ medals: user.medals });
}));
router.post("/handle-follow", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = req.body.follower;
    const followerUser = (yield usersCollection.findOne({ userId: follower }));
    const following = req.body.following;
    const followingUser = (yield usersCollection.findOne({ userId: following }));
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
    }
    followingUser.medals = followingMedals;
    yield usersCollection.deleteOne({ userId: follower });
    yield usersCollection.deleteOne({ userId: following });
    yield usersCollection.insertOne(followerUser);
    yield usersCollection.insertOne(followingUser);
    res.json({ message: "following handled successfully😊" });
}));
router.post("/get-id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = (yield usersCollection.findOne({ email }));
    res.json({ id: user.userId });
}));
exports.default = router;
