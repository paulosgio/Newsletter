import { Router } from "express";
import { auth } from "../../middlewares/auth.middlewares.js";
import { CampaignController } from "./campaign.controller.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const campaignRoutes = Router()
const campaignController = new CampaignController()

campaignRoutes.post("/", auth, adminOnly, campaignController.createCampaign)
campaignRoutes.get("/", auth, campaignController.getCampaign)
campaignRoutes.get("/:id", auth, campaignController.getOneCampaign)
campaignRoutes.patch("/:id", auth, adminOnly, campaignController.updateCampaign)
campaignRoutes.delete("/:id", auth, adminOnly, campaignController.deleteCampaign)
campaignRoutes.post("/send", auth, adminOnly, campaignController.sendCampaign)

export default campaignRoutes