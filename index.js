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
    return message.reply("🏓 Pong!");
  }

  if (message.content === "?ping") {
    return message.reply("🏓 Pong!");
  }

  if (message.content === "?ajuda") {
    return message.reply(`
📜 **Comandos do Game-lux**

🏓 ?ping - Verifica se o bot está online.
📖 ?ajuda - Mostra esta lista de comandos.
👋 ?oi - O bot cumprimenta você.
ℹ️ ?server - Mostra informações do servidor.

🚧 Em breve:
🖼️ ?avatar
🗑️ ?clear
    `);
  }

  if (message.content === "?oi") {
    return message.reply(`👋 Olá, ${message.author.username}! Seja bem-vindo!`);
  }

  if (message.content === "?server") {
    return message.reply(`
ℹ️ **Informações do servidor**

🏷️ Nome: ${message.guild.name}
👑 Dono: <@${message.guild.ownerId}>
👥 Membros: ${message.guild.memberCount}
🆔 ID: ${message.guild.id}
📅 Criado em: ${message.guild.createdAt.toLocaleDateString("pt-BR")}
    `);
  }
});

client.login(process.env.TOKEN);
