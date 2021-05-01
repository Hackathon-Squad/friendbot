import { PartialUser, User } from "discord.js";

export const Messages = {
  onStartSession: () => {
    return 'Heyo im friendbot react to this with :wave: to join us :open_mouth:'
  },
  onReaction: (user: User | PartialUser) => {
    return `Welcome to your friend session, ${user.username}!`;
  },
  onNonexistantCommand: () => {
    return 'Invalid command!'
  }
}