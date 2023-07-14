import { redis } from "./redis";
import { cleanUpRoom } from "./cleanUpRoom";

export async function getCleanRoomIds() {
  const roomIds_: string[] = JSON.parse((await redis.get("rooms")) ?? "[]");
  const roomIds: string[] = [];
  await Promise.all(
    roomIds_.map(async (roomId) => {
      const exists = await redis.get(`room:${roomId}:exists`);
      if (exists) {
        roomIds.push(roomId);
      } else {
        await cleanUpRoom(roomId);
      }
    })
  );
  await redis.set("rooms", JSON.stringify(roomIds));
  return roomIds;
}
