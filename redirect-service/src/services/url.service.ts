import prisma from "../config/prisma"
import { redisClient } from "../config/redisClient"

class UrlService {
  async getUrlByHash(hash: string): Promise<string> {
    const key: string = `hash:${hash}`

    const cachedHash = await redisClient.get(key)
    if (cachedHash) {
      return cachedHash
    }

    const [ found ] = await prisma.$queryRaw<any[]>`
      SELECT "url" FROM "Url" 
      WHERE "hash" = ${hash} 
      LIMIT 1
    `
    if (!found) {
      throw new Error("URL not found")
    }

    await redisClient.setEx(key, 86400, found.url)

    return found.url
  }
}

export default new UrlService()
