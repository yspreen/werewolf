import { Request, Response } from "express";
import { getRoom } from "../service/getRoom";
import { getCleanRoomIds } from "../service/getCleanRoomIds";
import { getUser } from "../service/getUser";
import { advanceCycle } from "../service/advanceCycle";

export async function advanceCycleEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res);

  const ids = await getCleanRoomIds();
  const { roomId } = req.body as {
    roomId: string;
  };
  if (!ids.includes(roomId)) {
    return res.json({ error: "room stale" });
  }

  const room = await getRoom(roomId);
  if (!room.memberIds.includes(user.userId)) {
    return res.json({ error: "not member" });
  }

  await advanceCycle(room, user);

  res.json({ room });
}
