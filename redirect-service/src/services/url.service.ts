import prisma from "../config/prisma"

class UrlService {
  async getUrlByHash(hash: string) {
    const [foundUrl] = await prisma.$queryRaw<any[]>`
      SELECT * FROM "Url" 
      WHERE "hash" = ${hash} 
      LIMIT 1
    `

    if (!foundUrl) {
      throw new Error("URL not found")
    }

    return foundUrl
  }
}

export default new UrlService()
