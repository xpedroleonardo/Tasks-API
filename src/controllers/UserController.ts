import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { unlink } from "fs";

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
  const { avatar } = await getRepository(User).findOne();
  const { name } = req.body;
  const { path } = req.file;

  if (name.length === 1) {
    return res.send({ message: "error data not found" });
  }

  const userUpdated = await getRepository(User).update(1, {
    name,
    avatar: path,
  });

  if (avatar) {
    unlink(avatar, () => {
      console.log("File deleted");
    });
  }

  if (userUpdated.affected === 1) {
    const updated = await getRepository(User).findOne();
    return res.json(updated);
  }

  return res.send({ message: "User not found" });
};
