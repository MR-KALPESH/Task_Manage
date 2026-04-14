import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./Config/DB.js";
import userRoute from "./Routes/UserRoutes.js";
import TaskRoutes from "./Routes/TaskRoutes.js";

const app = express();
// middelware
app.use(cors());
app.use(express.json());

// Route
app.use("/api/User", userRoute);
app.use("/api/Task", TaskRoutes);

app.get("/", (req, res) => {
  res.send("Conntecd to The Backend");
});

dotenv.config();

ConnectDB().then(() => {
  const Port = 5000;
  app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
  });
  app.on("error", (error) => {
    console.log("ERROR", error);
    throw error;
  });
});
