import express from "express";
import { RegisterUser, LoginUser } from "../Controller/UserController.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", RegisterUser);
UserRoutes.post("/login", LoginUser);

export default UserRoutes;
