import Hashids from "hashids"
import prisma from "../config/prisma"
import redis from "../config/redisClient"

class UrlService {
  private static COUNTER_KEY = "hash:counter"
  private static HASHIDS_SALT = process.env.HASHIDS_SALT

  static async generateHash(): Promise<string> {
    try {
      const idStr = await redis.incr(UrlService.COUNTER_KEY)
      const id = BigInt(idStr.toString ? idStr.toString() : `${idStr}`)

      const hashids = new Hashids(UrlService.HASHIDS_SALT, 7)
      const hashid = hashids.encode(Number(id))

      return hashid
    } catch (error) {
      throw new Error("Impossible to generate hash, please try again later.")                   
    }
  }

  async createHash(url: string) {
    try {
      const hash = await UrlService.generateHash();

      const created = await prisma.url.create({
        data: { url, hash }
      })

      return created
    } catch (error: any) {
      const isUniqueViolation =
        error?.code === "P2002" || error?.meta?.target?.includes("hash")
      if (isUniqueViolation) {
        for (let i = 0; i < 3; i++) {
          const retryResult = await this.retryCreateHash(url)
          if (retryResult) {
            return retryResult
          }
        }
        throw new Error("Impossible to generate hash, please try again later.")
      }
      throw error
    }
  }

  async retryCreateHash(url: string) {
    try {
      const hash = await UrlService.generateHash()
      
      return await prisma.url.create({
        data: { url, hash }
      })
    } catch (error: any) {
      if (!(error?.code === "P2002")) {
        throw error
      }
      return undefined
    }
  }
}

export default new UrlService()
