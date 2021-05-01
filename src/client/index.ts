import {
	Discord,
	Guard,
	On,
	Client,
	Command,
	CommandMessage,
	CommandNotFound,
	ArgsOf
} from '@typeit/discord';

import { NotBot, NotBotMsgReaction } from './guards';
import { Actions } from '../types/enums';
import { Messages } from './messages';
import { SessionService, UserService }from '../services'
import * as moment from 'moment';

@Discord('/')
class DiscordApp {

	@Command('friend :action')
	public async handleCommand(message: CommandMessage, client: Client) {
		let { action }: { action: string } = message.args;
		action = action.toUpperCase();
		if (action === Actions.START) {
			await this.startSession(message);	
		}
	}

	private async startSession(message: CommandMessage) {
		await this.sendStartSessionMessage(message);
		const startDate = moment().toDate();
		const endDate = moment().add(5, 'hours').toDate();
		await SessionService.startSession(message.guild.id, startDate, endDate, message.id);
	}

	private async sendStartSessionMessage(message: CommandMessage) {
		const botMessage = await message.channel.send(Messages.onStartSession());
		botMessage.react('👋')
	}


	@On('messageReactionAdd')
	@Guard(NotBotMsgReaction)
	public async reactionAdded([messageReaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
		user.send(Messages.onReaction(user));
		console.log(user.id)
		await UserService.addUser(messageReaction.message.guild.id, user.id)
	}

	@CommandNotFound()
	public notFound(message: CommandMessage, client: Client) {
		message.author.dmChannel.send(Messages.onNonexistantCommand());
	}
}