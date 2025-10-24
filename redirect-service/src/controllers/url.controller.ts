import { Request, Response } from "express";
import UrlService from "../services/url.service";

class UrlController {
  static async getUrlByHash(req: Request, res: Response) {
    const { hash } = req.params;

    try {
      const url = await UrlService.getUrlByHash(hash);
      res.redirect(301, url);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default UrlController;
