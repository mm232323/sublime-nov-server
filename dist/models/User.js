"use strict";
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
        const postUser = async () => await users.insertOne(this.user);
        postUser();
    }
    static async getUsers() {
        const usersArr = await users.find().toArray();
        return usersArr;
    }
    static async getUser(query) {
        const selectedUser = await users.findOne(query);
        return selectedUser;
    }
    static async update(searchQ, updateQ) {
        await users.updateOne(searchQ, updateQ);
        return "User Updated";
    }
    static async deleteUser(query) {
        await users.deleteOne(query);
        return "User Deleted";
    }
}
exports.default = User;
