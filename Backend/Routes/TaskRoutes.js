import express from "express";
import {
  CreateTask,
  DeleteTask,
  FindTask,
  UpdateTask,
} from "../Controller/TaskController.js";

const TaskRoutes = express.Router();

// CREATE TASK
TaskRoutes.post("/createTask", CreateTask);

// GET TASKS BY USER ID
TaskRoutes.get("/findTask/:userId", FindTask);

// UPDATE TASK
TaskRoutes.put("/UpdateTask/:id", UpdateTask);

// DELETE TASK
TaskRoutes.delete("/Delete/:id", DeleteTask);

export default TaskRoutes;
