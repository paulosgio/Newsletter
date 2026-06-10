import { PrismaClient } from "@prisma/client";
import type { CampaignDTO } from "./campaign.schema.js";

export class CampaignRepository {

    private db: PrismaClient

    constructor(db: PrismaClient) {
        this.db = db
    }

    async createCampaign(data: CampaignDTO, authorId: string) {
        return await this.db.campaign.create({
            data: {
                title: data.title,
                subject: data.subject,
                content: data.content,
                authorId
            }
        })
    }

    async getCampaign() {
        return await this.db.campaign.findMany()
    }

    async getOneCampaign(id: string) {
        return await this.db.campaign.findUnique({
            where: {
                id
            }
        })
    }

    async updateCampaign(id: string, data: CampaignDTO) {
        return await this.db.campaign.update({
            where: {
                id
            },
            data
        })
    }

    async deleteCampaign(id: string) {
        return await this.db.campaign.delete({
            where: {
                id
            }
        })
    }

    async findById(id: string) {
        return await this.db.campaign.findUnique({
            where: {
                id
            }
        })
    }

    async markAsSent(id: string) {
        return await this.db.campaign.update({
            where: { id },
            data: {
                sent: true,
                sentAt: new Date()
            }
        })
    }
}