import express from "express";
import * as authController from "../controllers/auth";
const router = express.Router();
router.post("/check-user", authController.checkUser);

router.post("/new-user", authController.postUser);

router.post("/get-user", authController.getUser);

export default router;
