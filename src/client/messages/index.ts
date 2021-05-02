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
        + `\n\nReact to this message with :wave: to join! :smile:`
    }
  },
  onEndFriendSession: () => {
    return {
      title: ':slight_frown: Ending a friend session',
      description: 'Closing the friend session! \n\nTo start another one, simply call `/friend init`. You can also use `/friend delete` to clear all generated channels'
    }
  },
  onDeleteChannels: () => {
    return {
      title: `:wastebasket: Deleting all Friend Session Channels`,
      description: "We've cleaned up and deleted all generated channels + categories"
    }
  },
  onStartMatching: () => {
    return {
      title: ':raised_hands: Pairing All Users!',
      description: 'Pairing users and sending out messages!'
    }
  },
  onMatchPairTitle: ':slight_smile: Welcome to Friendbot!',
  onMatchPair: (memberPingsStr: string) => {
    return `${memberPingsStr}, welcome to your group!`
  },
  pickConversationInitiator: (users: GuildMember[]) => {
    const randomUser = Utils.getRandomElementFromArray(users);
    return `We have randomly selected <@${randomUser.id}> to initiate the conversation.`
  },
  helpMessage: (unrecognizedCommand = false) => {
    return { title: unrecognizedCommand ? ':no_entry_sign: Unrecognized Command' : ':question: How to use Friendbot', description: `Hey, I'm friendbot! :wave: I help connect server members to each other and foster friendships. 

    I do this via friend pairing sessions, which are 2-week long events where members are randomly paired with other members on this server.
    
    **Commands**
    
    \`/friend init\` - Initializes a new friend pairing session. React to the message sent by this to be part of the session! (also deletes all generated channels)
    \`/friend pair\` - Matches all interested members into private channels so everyone can talk to each other.
    \`/friend stop\` - Stops a friend pairing session and deletes all bot generated methods
    \`/friend help\` - Shows this helpful help message!
    ` }
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
    return { title: '', description: 'A friend session is already running! To stop the session, type /friend stop' };
  }
}