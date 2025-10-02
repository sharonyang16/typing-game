import express from "express";
import cors from "cors";

const port = parseInt(process.env.PORT || "8000");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

app.get("/", (_, res) => {
  res.send("hello world");
});

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

const startServer = () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

export { startServer };
