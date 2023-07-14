import { Request, Response } from "express";
import { findUser } from "../service/getUser";

export async function getUserEndpoint(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await findUser(userId);
  res.json({ user });
}
