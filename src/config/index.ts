import { config } from 'dotenv';

config();

export const Config = {
  DISCORD_API_TOKEN: process.env.DISCORD_API_TOKEN,
}
