"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
const db = database_1.client.db("Sublime_Nov");
exports.default = db;
