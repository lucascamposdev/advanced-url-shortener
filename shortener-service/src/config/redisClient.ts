import Redis from "ioredis"

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

async function testRedisConnection() {
  try {
    const pong = await redis.ping()
    console.log("Redis Connected Sucessfully!:", pong)
  } catch (err) {
    console.error("Error connecting to Redis:", err)
  } 
}

testRedisConnection()

export default redis
