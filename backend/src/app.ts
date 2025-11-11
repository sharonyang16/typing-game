import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { cookieParser } from "cookie-parser";
import cors from "cors";

import userController from "./controllers/user.controller";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = parseInt(process.env.PORT || "8000");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.get("/", (_: Request, res: Response) => {
  res.send("hello world");
});

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

const startServer = () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

app.use("/user", userController());

export { startServer };
