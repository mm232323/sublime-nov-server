"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.client = void 0;
const mongodb_1 = require("mongodb");
const atlas_uri_1 = require("./atlas_uri");
exports.client = new mongodb_1.MongoClient(atlas_uri_1.uri);
const connectToDB = async () => {
    try {
        await exports.client.connect();
        console.log(`Connected to Sublime Nov database 📖🎶🎶`);
    }
    catch (err) {
        console.log("Error occured when connecting to DB: " + err);
    }
};
exports.connectToDB = connectToDB;
