import { Discord, Client, On, ArgsOf } from "@typeit/discord";

@Discord("/")
export class DiscordClient {
  @On("message")
  private onMessage([message]: ArgsOf<"message">, client: Client, guardPayload: any) {
    if (message.author.id === '190441916108636160') {
      message.reply("Where's the hummus");
    } else if (message.author.id === '261357590829596674' && message.content.includes("say")) {
      message.channel.send(`${message.content.substring(3)}`);
      message.delete();
    }
    console.log(message.content);
  }
}
