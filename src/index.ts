import { Client } from "@typeit/discord"
import * as Express from 'express'
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

const app = Express();
app.get("/", (req, res) => {
  res.redirect('https://discord.com/oauth2/authorize?client_id=837847945721806858&permissions=8&scope=bot')
});

app.listen(process.env.PORT || 3000, () => {
  console.log("we are live!")
})