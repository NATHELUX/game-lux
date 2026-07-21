const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }

  if (message.content === "?ping") {
    message.reply("🏓 Pong!");
  }

  if (message.content === "?ajuda") {
    message.reply(`
📜 **Comandos do Game-lux**

🏓 ?ping - Verifica se o bot está online.
📖 ?ajuda - Mostra esta lista de comandos.

🚧 Em breve:
👋 ?oi
🖼️ ?avatar
🗑️ ?clear
ℹ️ ?server
    `);
  }
});

client.login(process.env.TOKEN);
