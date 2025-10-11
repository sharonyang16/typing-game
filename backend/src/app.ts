import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(express.json());

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

export { startServer };
