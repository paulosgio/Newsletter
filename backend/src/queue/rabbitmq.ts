import amqp from "amqplib"
import "dotenv/config"

export async function connectRabbit() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL!)
    const channel = await connection.createChannel()

    return channel
}