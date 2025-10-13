import "reflect-metadata";
import { startServer } from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => startServer())
  .catch((error) => console.log(error));
