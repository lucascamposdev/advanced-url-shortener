import { Request, Response } from "express";
import UrlService from "../services/url.service";
import handleError from "../utils/handleError";

class UrlController {
  static async getUrlByHash(req: Request, res: Response) {
    const { hash } = req.params;

    try {
      const url = await UrlService.getUrlByHash(hash);
      res.redirect(301, url);
    } catch (error: unknown) {
      const handled = handleError(error)
      res.status(handled.statusCode).json({ message: handled.message });
    }
  }
}

export default UrlController;
