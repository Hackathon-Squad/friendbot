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
export class DiscordApp {

	@Command('friend :action')
	@Guard(NotBot)
	public async handleCommand(message: CommandMessage, client: Client) {
		const action: string = message.args.action.toUpperCase();
		switch (action) {
			case Actions.INIT: {
				await this.initializeSession(message);	
				break;
			}
			case Actions.PAIR: {
				await this.startMatching(message, client);
				break;
			}
			case Actions.DELETE: {
				await this.removeSession(message, client);
			}
		}
	}

	private async initializeSession(message: CommandMessage) {
		await this.sendMessageToCurrentChannel(message, Messages.onInitializeSession(), '👋');
		const startDate = moment().toDate();
		const endDate = moment().add(5, 'hours').toDate();
		await SessionService.initializeSession(message.guild.id, startDate, endDate, message.id);
	}

	private async sendMessageToCurrentChannel(message: CommandMessage, content: string, reaction?: string) {
		// Delete message sent by user to hide spam
		message.delete();
		const botMessage = await message.channel.send(content);
		if (reaction) botMessage.react(reaction);
	}

	private async startMatching(message: CommandMessage, client: Client) {
		await this.sendMessageToCurrentChannel(message, Messages.onStartMatching());

		// const matches = await SessionService.pairUsers(message.guild.id);

		// for (const match of matches) {
		// 	for (let i = 0; i < match.schema.users.length; i++) {
		// 		const userId = match.schema.users[i].schema.id;
		// 		const user = await client.users.fetch(userId);
		// 		const restOfGroup = match.schema.users.join(", ").slice(0, -2)
		// 		const dm = await user.send(`Hi! You've been paired in a group with ${restOfGroup} (including yourself). Reach out to them to make new friends!`)
		// 		match.schema.conversations[i] = dm.id;
		// 	}
		// }
	}

	private async removeSession(message: CommandMessage, client: Client) {
		const serverId = message.guild.id;
		const session = SessionService.findSessionByServerId(serverId);
		if (session) {
			this.sendMessageToCurrentChannel(message, 'Your server already has an initialized friend session!');
		}
		await SessionService.removeSession(serverId);
	}

	@On('messageReactionAdd')
	@Guard(NotBotMsgReaction)
	public async reactionAdded([messageReaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
		// user.send(Messages.onReaction(user));
		const serverId = messageReaction.message.guild.id;
		await SessionService.addUserToSession(serverId, user);
	}

	@On('messageReactionRemove')
	@Guard(NotBotMsgReaction)
	public async reactionRemoved([messageReaction, user]: ArgsOf<'messageReactionRemove'>, client: Client) {
		await UserService.removeUserFromSession(messageReaction.message.guild.id, user.id)
	}

	@CommandNotFound()
	public notFound(message: CommandMessage, client: Client) {
		message.author.dmChannel.send(Messages.onNonexistantCommand());
	}
}