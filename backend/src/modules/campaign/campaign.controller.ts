import { CampaignRepository } from "./campaign.repository.js";
import { prisma } from "../../database/prisma.js"
import { CampaignService } from "./campaign.service.js";
import type { Request, Response } from "express";

const repository = new CampaignRepository(prisma)
const service = new CampaignService(repository)

export class CampaignController {

    async createCampaign(req: Request, res: Response) {

        const { title, subject, content } = req.body

        const data = await service.createCampaignService({
            title,
            content,
            subject
        }, req.user.id)

        return res.status(200).json(data)
    }

    async getCampaign(req: Request, res: Response) {

        const data = await service.getCampaignService()
        return res.status(200).json(data)
    }

    async getOneCampaign(req: Request, res: Response) {

        const data = await service.getOneCampaignService(String(req.params.id))
        return res.status(200).json(data)
    }

    async updateCampaign(req: Request, res: Response) {

        const data = await service.updateCampaignService(String(req.params.id), req.body)
        return res.status(200).json(data)
    }

    async deleteCampaign(req: Request, res: Response) {

        const data = await service.deleteCampaignService(String(req.params.id))
        return res.status(200).json(data)
    }

    async sendCampaign(req: Request, res: Response) {

        const { id } = req.body
        
        const data = await service.sendCampaignService(id)
        return res.status(200).json(data)        
    }
}