import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { auth } from "../../middlewares/auth.middlewares.js";

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.patch("/subscribe", auth, usersController.subscribe)
usersRoutes.patch("/unsubscribe", auth, usersController.unsubscribe)
usersRoutes.get("/subscribers", auth, usersController.findSubscribers)
usersRoutes.get("/me", auth, usersController.me)

export default usersRoutes