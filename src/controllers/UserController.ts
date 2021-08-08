import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).save({
    name: "Pedro Leonardo",
    avatar: "profile.png",
  });
  return res.send(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({ id: 1 });
  return res.send(user);
};
