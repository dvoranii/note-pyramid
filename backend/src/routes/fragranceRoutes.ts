import { Router } from "express";
import { analyzeFragrance } from "../controllers/fragranceController.js";

const router = Router();

router.post("/analyze", analyzeFragrance);

export default router;
