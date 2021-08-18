import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { unlink } from "fs";
import path from "path";

import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  const userExist = await getRepository(User).findOne();

  if (userExist) {
    return res.send({ user: "O usuário já existe" });
  }

  const user = await getRepository(User).save({
    name: "Pedro Leonardo",
    avatar: "http://localhost:3333/image/avatar.svg",
  });

  res.send(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne();
  return res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne();
  const { name } = req.body;
  const file = req.file;

  if (name === "" || name.length > 25) {
    return res.send({ error: "Não altere o formulário" });
  }

  const AvatarName = user.avatar.split("image/");

  if (file?.filename) {
    if (AvatarName[1] !== "avatar.svg") {
      unlink(
        path.resolve(__dirname, "..", "..", "tmp", "upload", AvatarName[1]),
        (err) => {
          return res.json({ message: err });
        }
      );
    }
  }

  const userUpdated = await getRepository(User).update(1, {
    name,
    avatar: file?.filename
      ? `http://localhost:3333/image/${file?.filename}`
      : user.avatar,
  });

  if (userUpdated.affected === 1) {
    const updated = await getRepository(User).findOne();
    return res.json(updated);
  }

  return res.send({ message: "User not found" });
};
