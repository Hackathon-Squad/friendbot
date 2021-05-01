import { config } from 'dotenv';

config();

console.log(process.env.DISCORD_API_TOKEN)

export const Config = {
  DISCORD_API_TOKEN: process.env.DISCORD_API_TOKEN,
}
