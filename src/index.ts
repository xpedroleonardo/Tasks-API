import "reflect-metadata";
import * as express from "express";
import route from "./routes";

const app = express();

app.use(express.json());
app.use(route);

app.listen(3333, () => console.log("🚀 > http://localhost:3333"));
