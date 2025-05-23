import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);
Router.put("/update-profile", protectRoute, updateProfile);

Router.get("/checkAuth", protectRoute, checkAuth);

export default Router;
