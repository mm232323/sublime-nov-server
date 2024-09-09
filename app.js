"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/", function (req, res, next) {
    res.send("<h1>hello world</h1>");
});
app.listen(5800);
