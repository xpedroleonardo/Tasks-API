import { Router } from "express";

import { createTask, getTasks, getTask } from "./controllers/TaskController";
import { createUser, getUser } from "./controllers/UserController";

const route = Router();

route.get("/", getTasks);
route.get("/task/:id", getTask);
route.get("/user", getUser);

route.post("/create/task", createTask);
route.post("/create/user", createUser);

export default route;
