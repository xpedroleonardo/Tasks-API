import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Task } from "../entities/Task";

export const createTask = async (req: Request, res: Response) => {
  const task = await getRepository(Task).save(req.body);
  return res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const task = await getRepository(Task).find();
  return res.json(task);
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await getRepository(Task).findOne(id);

  if (!task) {
    return res.send({ message: "User not found!" });
  }

  return res.json(task);
};
