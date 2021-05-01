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
	@Guard(NotBot)
	public async handleCommand(message: CommandMessage, client: Client) {
		let { action }: { action: string } = message.args;
		action = action.toUpperCase();
		switch (action) {
			case Actions.START : {
				await this.startSession(message);	
				break;
			}
			case Actions.PAIR : {
				await this.startMatching(message, client);
				break;
			}
		}
	}

	private async startSession(message: CommandMessage) {
		await this.sendMessage(message, Messages.onStartSession(), '👋');
		message.delete();
		const startDate = moment().toDate();
		const endDate = moment().add(5, 'hours').toDate();
		await SessionService.startSession(message.guild.id, startDate, endDate, message.id);
	}

	private async startMatching(message: CommandMessage, client: Client) {
		await this.sendMessage(message, "Pairing users and sending out messages!");
		message.delete();

		const matches = await SessionService.pairUsers(message.guild.id);

		for (const match of matches) {
			for (let i = 0; i < match.schema.users.length; i++) {
				const userId = match.schema.users[i];
				const user = await client.users.fetch(userId);
				const dm = await user.send(`Hi! You've been paired in a group with ${match.schema.users.join(", ").slice(0, -2)} (including yourself). Reach out to them to make new friends!`)
				match.schema.conversations[i] = dm.id;
			}
		}

	}

	private async sendMessage(message: CommandMessage, content: string, reaction: string | null = null) {
		const botMessage = await message.channel.send(content);
		if (reaction !== null) {
			botMessage.react(reaction)
		}
	}


	@On('messageReactionAdd')
	@Guard(NotBotMsgReaction)
	public async reactionAdded([messageReaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
		// user.send(Messages.onReaction(user));
		await UserService.addUser(messageReaction.message.guild.id, user.id, user.username)
	}

	@On('messageReactionRemove')
	@Guard(NotBotMsgReaction)
	public async reactionRemoved([messageReaction, user]: ArgsOf<'messageReactionRemove'>, client: Client) {
		// user.send(Messages.onReaction(user));
		await UserService.removeUser(messageReaction.message.guild.id, user.id)
	}

	@CommandNotFound()
	public notFound(message: CommandMessage, client: Client) {
		message.author.dmChannel.send(Messages.onNonexistantCommand());
	}
}