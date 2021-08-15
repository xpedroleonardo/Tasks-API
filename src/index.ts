import "reflect-metadata";
import cors from "cors";
import express from "express";

import route from "./routes";
import "./database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(route);

app.listen(3333, () => console.log("🚀 - http://localhost:3333"));
