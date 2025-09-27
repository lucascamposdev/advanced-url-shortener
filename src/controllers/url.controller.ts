import { Request, Response } from "express";
import UrlService from "../services/url.service";

class UrlController {
  static async getUrlByHash(req: Request, res: Response) {
    const { hash } = req.params;

    try {
      const urlRecord = await UrlService.getUrlByHash(hash);
      res.redirect(urlRecord.url);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  
  static async createHash(req: Request, res: Response){
    const { url } = req.body
    
    try{
      const createdHash = await UrlService.createHash(url)

      const serverUrl = `${req.protocol}://${req.get("host")}/${createdHash.hash}`;
      res.status(201).json(serverUrl)
    } catch (err: any) {
      res.status(500).json({  message: err.message })
    }
  }

}

export default UrlController;
