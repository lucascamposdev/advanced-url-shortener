import { Request, Response } from "express"
import UrlService from "../services/url.service"
import handleError from "../utils/handleError"

class UrlController {
  static async createHash(req: Request, res: Response) {
    const { url } = req.body

    try {
      const hash = await UrlService.createHash(url)

      const serverUrl = `${req.protocol}://localhost/${hash}`
      res.status(201).json(serverUrl)
    } catch (error: unknown) {
      const handled = handleError(error)
      res.status(handled.statusCode).json({ message: handled.message })
    }
  }
}

export default UrlController
