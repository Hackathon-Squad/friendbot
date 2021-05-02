import { PartialUser, User } from "discord.js";

export const Messages = {
  onInitializeSession: () => {
    return '[ronak] Heyo im friendbot react to this with :wave: to join us :open_mouth:'
  },
  onStartMatching: () => {
    return '[ronak] Pairing users and sending out messages!';
  },
  onReaction: (user: User | PartialUser, serverName: string) => {
    return `[ronak] Welcome to ${serverName}'s friend session, ${user.username}!`;
  },
  onRemoveReaction: (user: User | PartialUser, serverName: string) => {
    return `[ronak] We've removed you from ${serverName}'s friend session, ${user.username}`;
  },
  onNonexistantCommand: () => {
    return '[ronak] Invalid command!'
  }
}