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
import { CategoryChannel, GuildMember, MessageEmbed } from 'discord.js';
import { NotBot, NotBotMsgReaction } from './guards';
import { Actions, HelpEmbedProps } from '../types';
import { Messages, MessageStruct } from './messages';
import { SessionService } from '../services'
import * as moment from 'moment';
import { MatchService } from '../services/MatchService';

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
			case Actions.STOP: {
				await this.removeAllBotGeneratedChannels(message);
				await this.removeSession(message);
				break;
			}
			case Actions.HELP: {
				await this.sendMessageToCurrentChannel(message, Messages.helpMessage());
				break;
			}
			default: {
				await this.sendMessageToCurrentChannel(message, Messages.helpMessage(true));
				break;
			}
		}
	}

	private async initializeSession(message: CommandMessage) {
		// check if there is a friend session already, if there is, don't do it and say ('please do /friend stop')
		const session = await SessionService.findSessionByServerId(message.guild.id);
		if (session) {
			this.sendMessageToCurrentChannel(message, Messages.onReinitializeSession());
			return;
		}
		await this.sendMessageToCurrentChannel(message, Messages.onInitializeSession(), '👋');
		const startDate = moment().toDate();
		const endDate = moment().add(5, 'hours').toDate();
		await SessionService.initializeSession(message.guild.id, startDate, endDate, message.id);
		await this.removeAllBotGeneratedChannels(message, true);
	}

	private async sendMessageToCurrentChannel(message: CommandMessage, content: MessageStruct, reaction?: string) {
		// Delete message sent by user to hide spam
		message.delete();
		// const botMessage = await message.channel.send(content);

		const embed = new MessageEmbed()
			.setTitle(content.title)
			.setDescription(content.description)
			.setColor('0xEE8277');

		const botMessage = await message.channel.send(embed);

		if (reaction) botMessage.react(reaction);
	}

	private async createCategory(message: CommandMessage, categoryName = 'Friend matching') {
		let category = message.guild.channels.cache.find(c => c.name == categoryName && c.type == "category") as CategoryChannel;
		if (!category) {
			category = await message.guild.channels.create(categoryName, {
				type: 'category'
			});
		}
		return category;
	}

	private async removeAllBotGeneratedChannels(message: CommandMessage, supressMessages = false) {
		if (!supressMessages) {
			this.sendMessageToCurrentChannel(message, Messages.onDeleteChannels());
		}
		const category = message.guild.channels.cache.find(c => c.name == 'Friend matching' && c.type == "category") as CategoryChannel;
		if (!category) return;
		await Promise.all(category.children.map(channel => channel.delete("Deleted for new friend session")));
		await category.delete();
	}

	private async startMatching(message: CommandMessage, client: Client) {
		await this.sendMessageToCurrentChannel(message, Messages.onStartMatching());
		const category = await this.createCategory(message);
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

			const embed = new MessageEmbed()
				.setTitle(Messages.onMatchPairTitle)
				.setDescription(Messages.onMatchPair(memberPings))
				.setColor('0xEE8277');

			channel.send(embed);
			channel.send(Messages.pickConversationInitiator(members))
			channel.send(Messages.randomConverstationQuestion())
		}
		await MatchService.batchWriteMatches(serverId, matches);
	}

	private async createChannelForUsers(category: CategoryChannel, members: GuildMember[], client: Client, channelNumber: number) {
		const guild = category.guild;
		const channel = await guild.channels.create(`friend-channel-${channelNumber}`);
		await channel.setParent(category);

		// bot permissions		
		channel.updateOverwrite(client.user.id, { VIEW_CHANNEL: true });
		channel.updateOverwrite(guild.roles.everyone, { VIEW_CHANNEL: false });

		members.forEach((member) => {
			channel.updateOverwrite(member.id, { VIEW_CHANNEL: true });
		});

		return channel;
	}

	private async removeSession(message: CommandMessage) {
		const serverId = message.guild.id;
		const session = await SessionService.findSessionByServerId(serverId);
		if (session) {
			this.sendMessageToCurrentChannel(message, Messages.onEndFriendSession());
		}
		await SessionService.removeSession(serverId);
	}

	@On('messageReactionAdd')
	@Guard(NotBotMsgReaction)
	public async reactionAdded([messageReaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
		if (!(messageReaction.message.author.id === client.user.id)) {
			return;
		}
		const serverName = messageReaction.message.guild.name;
		const serverId = messageReaction.message.guild.id;
		await SessionService.addUserToSession(serverId, user);

		await user.send(Messages.onReaction(user, serverName));
	}

	@On('messageReactionRemove')
	@Guard(NotBotMsgReaction)
	public async reactionRemoved([messageReaction, user]: ArgsOf<'messageReactionRemove'>, client: Client) {
		if (!(messageReaction.message.author.id === client.user.id)) {
			return;
		}
		await SessionService.removeUserFromSession(messageReaction.message.guild.id, user.id)
		const serverName = messageReaction.message.guild.name;

		await user.send(Messages.onRemoveReaction(user, serverName));

	}

	@CommandNotFound()
	public notFound(message: CommandMessage, client: Client) {
		message.author.dmChannel.send(Messages.onNonexistantCommand());
	}
}