import { SetOptions } from "redis";
import { redis } from "./redis";
import { ROOM_TTL_SECONDS } from "./config";
import { getCleanRoomIds } from "./getCleanRoomIds";
import { Room, newRoom } from "../models/room";
import { updateRoom } from "./updateRoom";

export async function createNewRoom(roomId: string): Promise<Room> {
  const roomIds = await getCleanRoomIds();
  roomIds.push(roomId);
  await redis.set(`room:${roomId}:exists`, "true", { EX: ROOM_TTL_SECONDS });
  const room = newRoom(roomId);
  await updateRoom(room);
  await redis.set("rooms", JSON.stringify(roomIds));
  return room;
}
