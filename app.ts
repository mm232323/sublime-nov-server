import express from "express";
import bodyParser from "body-parser";
import mainRoutes from "./router/main";
import authRoutes from "./router/auth";
import albumsRoutes from "./router/albums";
import userRoutes from "./router/user";
const app = express();
import { connectToDB } from "./util/database";
const main = async () => {
  try {
    await connectToDB();
    console.log("seccussful connected to posterizer database");
  } catch (err) {
    console.log("connecting failed");
  }
};
main();
app.use(bodyParser.json());

app.use(express.static("output"));

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/", albumsRoutes);
app.use("/user", userRoutes);

app.listen(5800);
