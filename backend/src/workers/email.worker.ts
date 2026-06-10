import { prisma } from "../database/prisma.js";
import { CampaignRepository } from "../modules/campaign/campaign.repository.js";
import { CampaignService } from "../modules/campaign/campaign.service.js";
import { UsersRepository } from "../modules/users/users.repository.js";
import { UserService } from "../modules/users/users.service.js";
import { connectRabbit } from "../queue/rabbitmq.js";
import { sendEmail } from "../services/email.service.js";

const channel = await connectRabbit()
const queue = "send-email"

await channel.assertQueue(queue)

const campaignRepository = new CampaignRepository(prisma)
const campaignService = new CampaignService(campaignRepository)
const userRepository = new UsersRepository(prisma)
const userService = new UserService(userRepository)

channel.consume(queue, async (message)=> {

    if (!message) {
        return
    }         
    
    const data = JSON.parse(message.content.toString())
    const { campaignId } = data

    try {
        const campaign = await campaignService.getOneCampaignService(campaignId)

        if (!campaign) {
            throw new Error("Campaign not found");
        }

        const subscribers = await userService.findSubscribersService()

        for (const subscriber of subscribers) {

            try {

                console.log("Enviando para:", subscriber.email)

                await sendEmail(
                    subscriber.email,
                    campaign.subject,
                    campaign.content
                )

                console.log("Enviado:", subscriber.email)
            } catch (err) {
                console.error("Erro ao enviar email:", err)
            }
        }
    
        await campaignService.markAsSentService(campaignId)

        channel.ack(message)
    } catch (error) {
        console.log(error)
    }
})