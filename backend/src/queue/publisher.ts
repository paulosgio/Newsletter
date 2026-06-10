import { connectRabbit } from "./rabbitmq.js";

export async function publishCampaign(campaignId: string) {
    
    const channel =  await connectRabbit()
    const queue = "send-email"

    await channel.assertQueue(queue)

    channel.sendToQueue(queue, Buffer.from(JSON.stringify({
        campaignId
    })))
}