import amqp from "amqplib";

const connection = await amqp.connect("amqp://127.0.0.1");
const channel = await connection.createChannel();
const TASKS = "tasks";
const queue = TASKS;
const exchange = TASKS;
const key = "20220225";
await channel.assertQueue(queue);
await channel.assertExchange(exchange, "topic");
/////////////////////////////////////////////////
await channel.bindQueue(queue, exchange, `${key}`);
await channel.prefetch(1);
await channel.consume(queue, async (msg) => {
  const message = JSON.parse(msg.content.toString());
  const {id, tasks} = message;
  console.log(process.pid, message);
  await tasks.reduce(async (memo, task, index) => {
    await memo;
    console.log(`${id}.${index} is running...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(`${id}.${index} is completed!`);
      }, task);
    });
  }, Promise.resolve());

  channel.ack(msg);
});
