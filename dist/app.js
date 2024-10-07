"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const main_1 = __importDefault(require("./router/main"));
const auth_1 = __importDefault(require("./router/auth"));
const albums_1 = __importDefault(require("./router/albums"));
const user_1 = __importDefault(require("./router/user"));
const app = (0, express_1.default)();
const database_1 = require("./util/database");
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, database_1.connectToDB)();
      console.log("seccussful connected to posterizer database");
    } catch (err) {
      console.log("connecting failed");
    }
  });
main();
app.use(body_parser_1.default.json());
app.use(express_1.default.static("output"));
app.use("/", main_1.default);
app.use("/auth", auth_1.default);
app.use("/", albums_1.default);
app.use("/user", user_1.default);
app.listen(5800);
