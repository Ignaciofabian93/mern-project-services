import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./src/config/database";
import userRouter from "./src/routes/userRoutes";

config();

connectDB();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
