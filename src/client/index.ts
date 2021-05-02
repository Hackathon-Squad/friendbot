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
import { CategoryChannel, GuildMember, TextChannel, User } from 'discord.js';
import { NotBot, NotBotMsgReaction } from './guards';
import { Actions } from '../types/enums';
import { Messages } from './messages';
import { SessionService } from '../services'
import * as moment from 'moment';
import { MatchService } from '../services/MatchService';
import { UserSchema } from '../schemas';

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
				break;
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
	
	private async createCategory(message: CommandMessage, categoryName: string) {
		let category = message.guild.channels.cache.find(c => c.name == categoryName && c.type == "category") as CategoryChannel;
		console.log(category);
		if (!category) {
			category = await message.guild.channels.create(categoryName, {
				type: 'category'
			});
		} 
		return category;
	}

	private async startMatching(message: CommandMessage, client: Client) {
		await this.sendMessageToCurrentChannel(message, Messages.onStartMatching());
		const category = await this.createCategory(message, 'Friend matching');
		const serverId = message.guild.id;
		const matches = await SessionService.pairUsers(serverId);
		for (let j = 0; j < matches.length; j++) {
			const match = matches[j];
			
			const conversations: string[] = [];
			const members = await Promise.all(match.users.map(async (user) => {
				const discordUser = await client.users.fetch(user.id);
				const guildMember = category.guild.member(discordUser);
				return guildMember;
			}));

			match.conversations = conversations;
			const channel = await this.createChannelForUsers(category, members, client, j);
			
			const memberPings = members.map((member) => `<@${member.id}>`).join(', ');
			channel.send(`${memberPings}, welcome to da club`);
		}
		await MatchService.batchWriteMatches(serverId, matches);
	}

	private async createChannelForUsers(category: CategoryChannel, members: GuildMember[], client: Client, channelNumber: number) {
		const guild = category.guild;
		const channel = await guild.channels.create(`friend-channel-${channelNumber}`,
			{
				permissionOverwrites: [
					{
						id: guild.roles.everyone,
						deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'VIEW_CHANNEL', 'CREATE_INSTANT_INVITE'],
					}
				]
			}
			);
		await channel.setParent(category);

		members.forEach((member) => {
			channel.overwritePermissions([
				{
					id: member.id,
					allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'EMBED_LINKS', 'SPEAK', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES'],
				}
			]);
		});
		
		return channel;
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
		const serverName = messageReaction.message.guild.name;
		const serverId = messageReaction.message.guild.id;
		await SessionService.addUserToSession(serverId, user);
		
		await user.send(Messages.onReaction(user, serverName));
	}

	@On('messageReactionRemove')
	@Guard(NotBotMsgReaction)
	public async reactionRemoved([messageReaction, user]: ArgsOf<'messageReactionRemove'>, client: Client) {
		await SessionService.removeUserFromSession(messageReaction.message.guild.id, user.id)
		const serverName = messageReaction.message.guild.name;

		await user.send(Messages.onRemoveReaction(user, serverName));

	}

	@CommandNotFound()
	public notFound(message: CommandMessage, client: Client) {
		message.author.dmChannel.send(Messages.onNonexistantCommand());
	}
}