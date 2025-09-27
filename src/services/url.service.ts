import prisma from "../config/prisma";
import { Prisma } from "../generated/prisma";
import generateHash from "../utils/generateHash";

class UrlService {
  async getUrlByHash(hash: string) {
    const foundUrl = await prisma.url.findFirst({ where: { hash }});

    if( !foundUrl ){
      throw new Error("URL not found")
    }

    return foundUrl
  }

  async createHash(url: string){
    try {
      const hash = generateHash();
  
      const created = await prisma.url.create({
        data: { url, hash }
      });
  
      return created;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") { 
          throw new Error("URL already registered");
        }
      }
      throw error; 
    }
  }

}

export default new UrlService();