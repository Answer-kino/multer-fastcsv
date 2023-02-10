import express from "express";
import indexController from "../controller";

import { csvUpload } from "../middleware/uploadHandler";
const router = express.Router();

router.get("/", indexController.indexPage);
router.post("/", csvUpload.single("capitalCsv"), indexController.indexPage);

export default router;
