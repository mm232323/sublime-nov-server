import express from "express";
const router = express.Router();
import * as mainController from "../controllers/main";
router.get("/about/audios", mainController.getAudioTypes);

router.post("/report", mainController.postReport);

router.post("/contactMessage", mainController.postContact);

export default router;
