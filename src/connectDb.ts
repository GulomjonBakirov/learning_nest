import { AppDataSource } from "./data-source";

export const connectDb = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database Connect Succefully");
    })
    .catch((err) => console.log("DATABASE CONNECTION ERROR: ", err));
};
