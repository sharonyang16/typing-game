import { startServer } from "./app";
import AppDataSource from "./data-source";

await AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    startServer();
  })
  .catch((error) => console.log(error));
