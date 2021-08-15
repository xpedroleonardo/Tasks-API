import { Router } from "express";
import multer from "multer";
import path from "path";
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
route.get("/image/:filename", (req, res) => {
  const { filename } = req.params;

  res.sendFile(path.resolve(__dirname, "..", "tmp", "upload", filename));
});

route.post("/create/user", createUser);
route.post("/create/task", createTask);

route.put("/update/user", multer(multerConfig).single("avatar"), updateUser);

route.put("/update/task/:id", updateTask);
route.patch("/completed/:id", completedTask);

route.delete("/delete/:id", deleteTask);

export default route;
