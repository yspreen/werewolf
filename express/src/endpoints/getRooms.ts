import { Request, Response } from "express";
import { getCleanRoomIds } from "../service/getCleanRoomIds";
import { getRoom } from "../service/getRoom";

export async function getRoomsEndpoint(_: Request, res: Response) {
  const roomIds = await getCleanRoomIds();
  const rooms = await Promise.all(roomIds.map(getRoom));
  res.json({ roomIds, rooms });
}
