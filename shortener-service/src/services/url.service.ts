import Hashids from "hashids"
import prisma from "../config/prisma"
import redis from "../config/redisClient"

class UrlService {
  private static COUNTER_KEY: string = "hash:counter"
  private static HASHIDS_SALT: string = process.env.HASHIDS_SALT || "this_is_our:secret"

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

  async createHash(url: string): Promise<string> {
    try {
      const hash = await UrlService.generateHash();

      const created = await prisma.url.create({
        data: { url, hash }
      })

      return created.hash
    } catch (error: any) {
      const isUniqueViolation =
        error?.code === "P2002" || error?.meta?.target?.includes("hash")
      if (isUniqueViolation) {
        for (let i = 0; i < 3; i++) {
          const retryResultHash = await this.retryCreateHash(url)
          if (retryResultHash) {
            return retryResultHash
          }
        }
        throw new Error("Impossible to generate hash, please try again later.")
      }
      throw error
    }
  }

  async retryCreateHash(url: string): Promise<string | null> {
    try {
      const hash = await UrlService.generateHash()
      
      const createdHash = await prisma.url.create({
        data: { url, hash }
      })

      return createdHash.hash
    } catch (error: any) {
      if (!(error?.code === "P2002")) {
        throw error
      }
      return null
    }
  }
}

export default new UrlService()
