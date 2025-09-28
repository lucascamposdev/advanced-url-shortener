import Redis from "ioredis"

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});

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
