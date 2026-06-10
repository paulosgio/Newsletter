import { publishCampaign } from "../../queue/publisher.js"
import type { CampaignRepository } from "./campaign.repository.js"
import type { CampaignDTO } from "./campaign.schema.js"

export class CampaignService {

    private repository: CampaignRepository

    constructor(repository: CampaignRepository) {
        this.repository = repository
    }

    async createCampaignService(data: CampaignDTO, authorId: string) {

        try {
            return await this.repository.createCampaign(data, authorId)
        } catch (error) {
            throw new Error("Fail to create campaign: " + error);
        }
    }

    async getCampaignService() {

        try {
            return await this.repository.getCampaign()
        } catch (error) {
            throw new Error("Campaigns not found: " + error);
        }
    }

    async getOneCampaignService(id: string) {

        try {
            return await this.repository.getOneCampaign(id)
        } catch (error) {
            throw new Error("Campaign not found: " + error);
        }
    }

    async updateCampaignService(id: string, data: CampaignDTO) {

        try {
            return await this.repository.updateCampaign(id, data)
        } catch (error) {
            throw new Error("Fail to update Campaign: " + error);
        }
    }

    async deleteCampaignService(id: string) {

        try {
            return await this.repository.deleteCampaign(id)
        } catch (error) {
            throw new Error("Fail to delete Campaign: " + error);
        }
    }

    async sendCampaignService(id: string) {

            const campaign = await this.repository.findById(id)

            if (!campaign) {
                throw new Error("campaign not found");
            }

            await publishCampaign(campaign.id)

            return {
                message: "Campaign queued"
            }
    }

    async markAsSentService(id: string) {

        return await this.repository.markAsSent(id)
    }
}