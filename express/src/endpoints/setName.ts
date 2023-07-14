import { Request, Response } from "express";
import { getUser } from "../service/getUser";
import { updateUser } from "../service/updateUser";

export async function setName(req: Request, res: Response) {
  const user = await getUser(req, res);

  console.log("BODY", req.body);
  const { name } = req.body;

  user.name = name;
  await updateUser(user);
  res.json(user);
}
