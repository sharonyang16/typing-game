import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
