import express from "express";

const port = parseInt(process.env.PORT || "8000");

const app = express();

app.get("/", (_, res) => {
  res.send("hello world");
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

export { startServer };
