import { Discord, Client, On, ArgsOf } from "@typeit/discord";

@Discord("/")
export class DiscordClient {
  @On("message")
  private onMessage([message]: ArgsOf<"message">, client: Client, guardPayload: any) {
    console.log(message.content);
  }
}
