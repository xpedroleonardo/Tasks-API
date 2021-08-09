import { Router } from "express";
import * as multer from "multer";
import { multerConfig } from "./config/multer";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  completedTask,
  deleteTask,
} from "./controllers/TaskController";

import { createUser, getUser, updateUser } from "./controllers/UserController";

const route = Router();

route.get("/", getTasks);
route.get("/user", getUser);
route.get("/task/:id", getTask);

route.post("/create/user", createUser);
route.post("/create/task", createTask);

route.put("/update/user", multer(multerConfig).single("avatar"), updateUser);

route.put("/update/task/:id", updateTask);
route.patch("/completed/:id", completedTask);

route.delete("/delete/:id", deleteTask);

export default route;
