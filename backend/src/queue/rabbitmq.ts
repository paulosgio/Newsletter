import amqp from "amqplib"
import "dotenv/config"

export async function connectRabbit() {

    while (true) {

        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL!)
            const channel = await connection.createChannel()
    
            console.log("CONNECTED TO RABBITMQ!");
            
            return channel
        } catch (error) {

            console.log("RABBITMQ STILL NO WORKING, TRYING AGAIN...");
            await new Promise(resolve => setTimeout(resolve, 5000))
        }
    }
}