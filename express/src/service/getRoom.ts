import { Room, newRoom } from "../models/room";
import { redis } from "./redis";

export async function getRoom(roomId: string): Promise<Room> {
  return JSON.parse(
    (await redis.get(`room:${roomId}:info`)) ?? JSON.stringify(newRoom(roomId))
  );
}
