import {
	Discord,
	Guard,
	On,
	Client,
	Command,
	CommandMessage,
	CommandNotFound,
	ArgsOf
} from "@typeit/discord";

import { NotBot } from "./guards";
import { Actions } from '../types/enums';

@Discord('/') 
class DiscordApp {

	@Command('friend session :action')
	private hello(message: CommandMessage, client: Client) {
		const { action }: { action: string } = message.args;
		if (action.toUpperCase() === Actions.START) {
			// client.channels.cache.get();
			client.user.dmChannel.send('now i dont ping u lmaoooo')
		}
		message.reply(action);
	}

	@On('message')
  @Guard(NotBot)
	private test([message]: ArgsOf<'message'>, client: Client) {
		// message.reply('Damn bro');
	}

	@CommandNotFound()
	private notFound(message: CommandMessage) {
	}
}