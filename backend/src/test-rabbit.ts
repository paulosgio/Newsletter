import { connectRabbit } from "./queue/rabbitmq.js";

async function test() {
    
    const channel = await connectRabbit()

    await channel.assertQueue("send-email")

    console.log("queue created!");
}

test()