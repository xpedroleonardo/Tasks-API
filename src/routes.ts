import { Router } from "express";

import { createTask } from "./controllers/TaskController";

const route = Router();

route.post("/create", createTask);

export default route;
