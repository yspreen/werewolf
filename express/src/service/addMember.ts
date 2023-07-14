import { getRoom } from "../service/getRoom";
import { redis } from "./redis";
import { Room } from "../models/room";

export async function addMember(roomId: string, userId: string): Promise<Room> {
  const room = await getRoom(roomId);
  if (!room.memberIds.includes(userId)) room.memberIds.push(userId);
  await redis.set(`room:${roomId}:info`, JSON.stringify(room));
  return room;
}
