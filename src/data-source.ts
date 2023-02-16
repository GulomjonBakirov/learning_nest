import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "571632",
  database: "node_typeorm",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
});
