import { Client } from "@typeit/discord"
import * as DB from "./models"

const start = async () => {
  const classes = [`${__dirname}/client/*`];
  const client = new Client({
    classes,
    variablesChar: ':',
    silent: false,
  })

  await client.login('ODM3ODQ3OTQ1NzIxODA2ODU4.YIygtA.TGiN_kR-Opb4YxgbsI1CnCCgILM');
  console.log('Discord bot initialized');
}
DB.seed();

start();
