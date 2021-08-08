import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Task } from "../entities/Task";

export const createTask = async (req: Request, res: Response) => {
  const task = await getRepository(Task).save(req.body);
  res.json(task);
};
