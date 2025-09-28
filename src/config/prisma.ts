import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log("🟢 Prisma conectado com sucesso ao banco de dados")
  } catch (error) {
    console.error("🔴 Erro ao conectar com o banco de dados via Prisma:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

export default prisma
