import { Request, Response } from "express"
import UrlService from "../services/url.service"

class UrlController {
  static async createHash(req: Request, res: Response) {
    const { url } = req.body

    try {
      const createdHash = await UrlService.createHash(url)

      const serverUrl = `${req.protocol}://localhost/${createdHash.hash}`
      res.status(201).json(serverUrl)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default UrlController
