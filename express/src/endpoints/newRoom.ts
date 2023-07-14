import { Request, Response } from "express";
import { uuid } from "../service/uuid";
import { createNewRoom } from "../service/createNewRoom";
import { addMember } from "../service/addMember";
import { getUser } from "../service/getUser";
import { randomEmoji } from "../service/emoji";
import { updateRoom } from "../service/updateRoom";

export async function newRoom(req: Request, res: Response) {
  const user = await getUser(req, res);

  const roomId = uuid();
  await createNewRoom(roomId);
  const room = await addMember(roomId, user.userId);
  const emoji = randomEmoji();
  room.name = `${user.name}'s Room ${emoji}`;
  room.admins.push(user.userId);
  await updateRoom(room);
  res.json({ roomId, room });
}
