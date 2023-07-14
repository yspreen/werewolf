import { Request, Response } from "express";
import { getRoom } from "../service/getRoom";
import { getCleanRoomIds } from "../service/getCleanRoomIds";
import { getUser } from "../service/getUser";
import { updateRoom } from "../service/updateRoom";
export async function startGame(req: Request, res: Response) {
  const user = await getUser(req, res);

  const ids = await getCleanRoomIds();
  const { roomId, roleCount } = req.body as {
    roomId: string;
    roleCount: Record<string, number>;
  };
  if (!ids.includes(roomId)) {
    return res.json({ error: "room stale" });
  }

  const room = await getRoom(roomId);
  if (!room.admins.includes(user.userId)) {
    return res.json({ error: "not admin" });
  }

  if (
    room.memberIds.length !==
    Object.values(roleCount).reduce((a, b) => a + b, 0)
  )
    return res.json({ error: "wrong count" });

  const choices: string[] = [];
  for (const key of Object.keys(roleCount)) {
    for (let i = 0; i < roleCount[key]; i++) choices.push(key);
  }
  shuffle(choices);

  room.givenRoles = {};
  for (const memberId of room.memberIds) {
    room.givenRoles[memberId] = choices.pop() ?? "UNKNOWN";
  }
  await updateRoom(room);

  res.json({ room });
}

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
