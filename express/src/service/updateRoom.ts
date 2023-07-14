import { Room } from "../models/room";
import { redis } from "./redis";

export async function updateRoom(room: Room) {
  await redis.set(`room:${room.roomId}:info`, JSON.stringify(room));
}
