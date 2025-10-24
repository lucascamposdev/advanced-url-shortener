import pgBouncer from "../config/pgBouncer";
import { redisClient } from "../config/redisClient"

class UrlService {
  async getUrlByHash(hash: string): Promise<string> {
    const key: string = `hash:${hash}`

    const cachedHash = await redisClient.get(key)
    if (cachedHash) {
      return cachedHash
    }

    const { rows } = await pgBouncer.query(
      `SELECT "url" FROM "Url" WHERE "hash" = $1 LIMIT 1`,
      [hash]
    );
    
    const found = rows[0];

    if (!found) {
      throw new Error("URL not found")
    }

    await redisClient.setEx(key, 86400, found.url)

    return found.url
  }
}

export default new UrlService()
