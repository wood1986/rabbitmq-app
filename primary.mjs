import amqp from "amqplib";

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();
const TASKS = "tasks";
const queue = TASKS;
const exchange = TASKS;
const key = "20220225";
await channel.assertQueue(queue);
await channel.assertExchange(exchange, "topic");
/////////////////////////////////////////////////
import {nanoid} from "nanoid";
import polka from "polka";
import send from "@polka/send-type";

polka()
  .get("/build", async (req, res) => {
    const id = nanoid();
    const message = { id, tasks: Array(3).fill(0).map(() => ~~(Math.random() * 10 * 1000)) };
    console.log(process.pid, message);
    channel.publish(exchange, `${key}`, Buffer.from(JSON.stringify(message)));
    send(res, 200, {id});
  })
  .listen(3000, () => {
    console.log("> Running on localhost:3000");
  });
