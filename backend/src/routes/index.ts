import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import compaignRoutes from "../modules/campaign/campaign.routes.js"

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/users", usersRoutes)
routes.use("/campaigns", compaignRoutes)

export default routes