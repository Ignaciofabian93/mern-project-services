import mongoose from "mongoose";
import { config } from "dotenv";

config();
const uri = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Database connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
