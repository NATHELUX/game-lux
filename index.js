const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.login("COLOQUE_SEU_TOKEN_AQUI");
