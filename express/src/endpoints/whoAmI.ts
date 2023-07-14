import { Request, Response } from "express";
import { getUser } from "../service/getUser";

export async function whoAmI(req: Request, res: Response) {
  const user = await getUser(req, res);
  res.json(user);
}
