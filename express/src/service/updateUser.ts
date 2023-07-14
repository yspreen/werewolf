import { User } from "../models/user";
import { redis } from "./redis";
import { USER_TTL_SECONDS } from "./config";

export async function updateUser(user: User) {
  await redis.set(`user:${user.userId}:profile`, JSON.stringify(user), {
    EX: USER_TTL_SECONDS * 2,
  });
}
