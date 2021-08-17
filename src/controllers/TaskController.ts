import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Task } from "../entities/Task";
import { User } from "../entities/User";

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (
    title === "" ||
    title.length > 30 ||
    description === "" ||
    description.length > 255
  ) {
    return res.send({ error: "Não altere o formulário" });
  }

  const task = await getRepository(Task).save({ title, description });
  return res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne();
  const tasks = await getRepository(Task).find({
    order: { completed: "ASC" },
  });
  return res.json({ user, tasks });
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await getRepository(Task).findOne(id);

  if (!task) {
    return res.send({ message: "Task not found!" });
  }

  return res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (
    title === "" ||
    title.length > 30 ||
    description === "" ||
    description.length > 255
  ) {
    return res.send({ error: "Não altere o formulário" });
  }

  const task = await getRepository(Task).update(id, { title, description });

  if (task.affected === 1) {
    const taskUpdated = await getRepository(Task).findOne(id);
    return res.json(taskUpdated);
  }

  return res.json(task);
};

export const completedTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await getRepository(Task).update(id, { completed: true });

  if (task.affected === 1) {
    const taskUpdated = await getRepository(Task).findOne(id);
    return res.json(taskUpdated);
  }

  return res.json({ message: "Task not found" });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await getRepository(Task).delete(id);

  if (task.affected === 1) {
    return res.send({ message: "Task deleted" });
  }

  return res.send({ message: "Task not found" });
};
