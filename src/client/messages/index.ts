import { GuildMember, PartialUser, User } from "discord.js";
import { Utils } from "../../utils";

export interface MessageStruct {
  title: string;
  description: string;
}

export const Messages = {
  onInitializeSession: () => {
    return {
      title: ':wave: Starting a Friend Session',
      description: `Hey, I'm friendbot! A new friend pairing session has been initiated on this server. `
    + `Friend pairing sessions are 2-week long events where members are randomly paired with other members `
    + `on this server.`
    + `\n\nReact to this message with :wave: to join! :smile:`}
  },
  onStartMatching: () => {
    return {title: ':raised_hands: Pairing All Users!',
    description: 'Pairing users and sending out messages!';}
  },
  onMatchPair: (memberPingsStr: string) => {
    return {title: ':slight_smile: New Friend Found!', description: `${memberPingsStr}, welcome to your group!`}
  },
  pickConversationInitiator: (users: GuildMember[]) => {
    const randomUser = Utils.getRandomElementFromArray(users);
    return {title: '', description: `We have randomly selected <@${randomUser.id}> to initiate the conversation.` }
  },
  helpMessage: () => {
    return {title: ':question: How to use Friendbot', description: `TODO: Write Help Message`}
  },
  randomConverstationQuestion: () => {
    const questions = [
      'Greatest movie of all time?',
      'Greatest movie made before 2000?',
      'Greatest movie made after 2000?',
      'Favorite cuisine? (e.g. Mexican food, Asian food, American Food)',
      'What was the last song you listened to on your phone?',
      'Favorite music genre?',
      'Favorite video game?',
      'Favorite hobby?',
    ];

    const randomQuestion = Utils.getRandomElementFromArray(questions);
    return `**Randomly generated discussion starter: ** ${randomQuestion}`;
  },

  onReaction: (user: User | PartialUser, serverName: string) => {
    return `Welcome to ${serverName}'s friend session, ${user.username}!`;
  },
  onRemoveReaction: (user: User | PartialUser, serverName: string) => {
    return `We've removed you from ${serverName}'s friend session, ${user.username}`;
  },
  onNonexistantCommand: () => {
    return 'Invalid command!'
  },
  onReinitializeSession: () => {
    return {title: '', description: 'A friend session is already running! To stop the session, type /friend stop'};
  }
}