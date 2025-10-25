import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import http from "http"
import routes from "./routes/routes"
import { connectRedis } from "./config/redisClient"

const app = express()
const server = http.createServer(app)

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use(routes)

const startServer = async (): Promise<void> => {
  await connectRedis()

  server.listen(3001, () => {
    console.log("🚀 Servidor rodando em http://localhost:3001")
  })
}

startServer()

export default app
