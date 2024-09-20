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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.client = void 0;
const mongodb_1 = require("mongodb");
const atlas_uri_1 = require("./atlas_uri");
exports.client = new mongodb_1.MongoClient(atlas_uri_1.uri);
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log(`Connected to Sublime Nov database 📖🎶🎶`);
    }
    catch (err) {
        console.log("Error occured when connecting to DB: " + err);
    }
});
exports.connectToDB = connectToDB;
