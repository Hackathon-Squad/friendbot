import { GuardFunction } from "@typeit/discord";

export const NotBot: GuardFunction<"message"> = async (
  [message],
  client,
  next
) => {
  if (!message.author.bot) {
    await next();
  }
};

export const NotBotMsgReaction: GuardFunction<"messageReactionAdd"> = async (
  [,user],
  client,
  next
) => {
  if (!user.bot) {
    await next();
  }
};