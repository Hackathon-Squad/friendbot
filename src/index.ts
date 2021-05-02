import { Client } from "@typeit/discord"
import { Config } from './config';
// import * as DB from "./models"

const start = async () => {
  const classes = [`${__dirname}/client/*`];
  const client = new Client({
    classes,
    variablesChar: ':',
    silent: false,
  })

  await client.login(Config.DISCORD_API_TOKEN);
  await client.user.setPresence({
    activity: {
      name: "🧐 pressing x to doubt"
    }
  });
  console.log('Discord bot initialized');
}
// DB.seed();

start();
