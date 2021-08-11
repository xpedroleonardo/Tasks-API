import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { unlink } from "fs";
import * as path from "path";

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
  const user = await getRepository(User).findOne();
  const { name, avatar } = req.body;
  const file = req.file;

  if (name.length === 1) {
    return res.send({ message: "error data not found" });
  }

  if (file?.filename) {
    unlink(
      path.resolve(__dirname, "..", "..", "tmp", "upload", user.avatar),
      (err) => {
        return res.json({ message: err });
      }
    );
  }

  const userUpdated = await getRepository(User).update(1, {
    name,
    avatar: file?.filename ? file?.filename : user.avatar,
  });

  if (userUpdated.affected === 1) {
    const updated = await getRepository(User).findOne();
    return res.json(updated);
  }

  return res.send({ message: "User not found" });
};
