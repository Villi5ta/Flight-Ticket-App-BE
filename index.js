import flightRouter from "./src/routes/flight.js";
import flightGroupRouter from "./src/routes/flight_group.js";
import userRouter from "./src/routes/user.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Successfully connected to Database!"))
  .catch((error) => {
    console.log("error", error);
  });
app.use(flightGroupRouter);
app.use(flightRouter);
app.use(userRouter);

app.use((req, res) => {
  return res
    .status(404)
    .json({ message: "The page you're looking for is unavail" });
});

app.listen(process.env.PORT, () => {
  console.log("App working");
});

app.use((req, res) => {
  return res.status(404).json({ status: "App NOT working" });
});
