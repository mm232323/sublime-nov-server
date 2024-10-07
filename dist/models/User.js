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
const db_1 = __importDefault(require("../lib/db"));
const users = db_1.default.collection("users");
class User {
    constructor(user) {
        this.user = null;
        this.user = user;
        const postUser = () => __awaiter(this, void 0, void 0, function* () { return yield users.insertOne(this.user); });
        postUser();
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersArr = yield users.find().toArray();
            return usersArr;
        });
    }
    static getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedUser = yield users.findOne(query);
            return selectedUser;
        });
    }
    static update(searchQ, updateQ) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users.updateOne(searchQ, updateQ);
            return "User Updated";
        });
    }
    static deleteUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users.deleteOne(query);
            return "User Deleted";
        });
    }
}
exports.default = User;
