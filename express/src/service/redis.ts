import { createClient } from "redis";

const user = process.env.REDIS_USER ?? "";
const pw = process.env.REDIS_PW ?? "";
const host = process.env.REDIS_HOST ?? "localhost";
const port = process.env.REDIS_PORT ?? "6379";

const redis = createClient({
  url: `redis://${user}:${pw}@${host}:${port}`,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export async function init() {
  await redis.connect();
}

export { redis };
