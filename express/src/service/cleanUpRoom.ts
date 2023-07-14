import { redis } from "./redis";

export async function cleanUpRoom(roomId: string) {
  await redis.del(`room:${roomId}:exists`);
  await redis.del(`room:${roomId}:info`);
  await redis.del(`room:${roomId}:members`);
}
