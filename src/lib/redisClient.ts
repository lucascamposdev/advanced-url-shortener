import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379")

async function testRedisConnection() {
  try {
    const pong = await redis.ping()
    console.log("Redis conectado:", pong)
  } catch (err) {
    console.error("Erro ao conectar no Redis:", err)
  } 
}

testRedisConnection()

export default redis
