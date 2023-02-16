import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { User } from "./entities/user.entity";
import { connectDb } from "./connectDb";
import routes from "./routes";

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 3002;
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Project is listening at http://localhost:${port}`);
});
