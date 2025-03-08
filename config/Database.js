import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDatabase() {
  mongoose
    .connect(process.env.MONGO_DB_URI, { dbName: process.env.DB_NAME })
    .then(() => {
      console.log({message:`Db connected`})
    })
    .catch((e) => {
      console.log(e);
    });
}
