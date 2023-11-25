import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/database";
import userRouter from "./routes/userRoutes";

config();

connectDB();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api", userRouter);

console.log("nueva rama!!!!");

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
