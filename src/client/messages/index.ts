import { PartialUser, User } from "discord.js";

export const Messages = {
  onInitializeSession: () => {
    return 'Heyo im friendbot react to this with :wave: to join us :open_mouth:'
  },
  onStartMatching: () => {
    return 'Pairing users and sending out messages!';
  },
  onReaction: (user: User | PartialUser, serverName: string) => {
    return `Welcome to ${serverName}'s friend session, ${user.username}!`;
  },
  onRemoveReaction: (user: User | PartialUser) => {
    return `We've removed you from the matching session, ${user.username}`
  },
  onNonexistantCommand: () => {
    return 'Invalid command!'
  }
}