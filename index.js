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
👋 ?oi - O bot cumprimenta você.

🚧 Em breve:
🖼️ ?avatar
🗑️ ?clear
ℹ️ ?server
    `);
  }

  if (message.content === "?oi") {
    message.reply(`👋 Olá, ${message.author.username}! Seja bem-vindo!`);
  }
});

client.login(process.env.TOKEN);
