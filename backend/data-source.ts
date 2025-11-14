import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URL } =
  process.env;

const AppDataSourceDev = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["entity/**/*.{ts,js}"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});

const AppDataSourceProd = new DataSource({
  type: "postgres",
  url: DB_URL,
  host: DB_HOST,
  synchronize: true,
  logging: true,
  entities: ["entity/**/*.{ts,js}"],
  migrations: ["migration/**/*.{j,t}s"],
  subscribers: [],
});

const dataSource =
  process.env.NODE_ENV === "PROD" ? AppDataSourceProd : AppDataSourceDev;

export default dataSource;
