import crypto from "crypto"
import Hashids from "hashids"
import prisma from "../config/prisma"
import redis from "../lib/redisClient"

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
      const rnd = crypto.randomBytes(6)             
      const num = Number(BigInt("0x" + rnd.toString("hex")))
      const hashids = new Hashids(UrlService.HASHIDS_SALT, 7)
      return hashids.encode(num)                     
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
    const hash = await UrlService.generateHash()
    try {
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
