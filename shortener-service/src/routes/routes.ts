import { Router } from "express";
import UrlController from "../controllers/url.controller";

const router = Router();

router.post("/", UrlController.createHash);

export default router;
