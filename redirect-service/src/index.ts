import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import http from "http"
import routes from "./routes/routes"
import { connectRedis } from "./config/redisClient"
import { testConnection } from "./config/pgBouncer"

const app = express()
const server = http.createServer(app)

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use(routes)

const startServer = async () => {
  await testConnection()
  await connectRedis()

  server.listen(3001, () => {
    console.log("🚀 Servidor rodando em http://localhost:3001")
  })
}

startServer()

export default app
