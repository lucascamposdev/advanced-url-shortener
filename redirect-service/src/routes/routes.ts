import { Router } from "express";
import UrlController from "../controllers/url.controller";

const router = Router();

router.get("/:hash", UrlController.getUrlByHash);

export default router;
