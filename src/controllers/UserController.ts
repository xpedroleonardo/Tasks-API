import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  const userExist = await getRepository(User).findOne();

  if (userExist) {
    return res.send({ message: "The user alrealy exist!" });
  }

  const user = await getRepository(User).save({
    name: "Pedro Leonardo",
    avatar: "profile.png",
  });

  return res.send(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne();
  return res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, avatar } = req.body;

  if (name.length === 0 || avatar.length === 0) {
    return res.send({ message: "error data not found" });
  }

  const user = await getRepository(User).update(1, req.body);

  if (user.affected === 1) {
    const userUpdated = await getRepository(User).findOne();
    return res.json(userUpdated);
  }

  return res.send({ message: "User not found" });
};
