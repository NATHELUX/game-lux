const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");

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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // ?ping
  if (message.content === "!ping" || message.content === "?ping") {
    return message.reply("🏓 Pong!");
  }

  // ?ajuda
  if (message.content === "?ajuda") {
    return message.reply(`
📜 **Comandos do Game-lux**

🏓 ?ping - Verifica se o bot está online.
📖 ?ajuda - Mostra esta lista de comandos.
👋 ?oi - O bot cumprimenta você.
ℹ️ ?server - Mostra informações do servidor.
👤 ?userinfo - Mostra informações do usuário.
🖼️ ?avatar - Mostra seu avatar.
🎲 ?dado - Rola um dado de 6 lados.
🗑️ ?clear - Apaga mensagens.

🚧 Em breve:
🪙 ?caraoucoroa
    `);
  }

  // ?oi
  if (message.content === "?oi") {
    return message.reply(`👋 Olá, ${message.author.username}! Seja bem-vindo!`);
  }

  // ?server
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

  // ?userinfo
  if (message.content === "?userinfo") {
    return message.reply(`
👤 **Informações do usuário**

🏷️ Nome: ${message.author.username}
🆔 ID: ${message.author.id}
📅 Conta criada em: ${message.author.createdAt.toLocaleDateString("pt-BR")}
🎭 Cargo mais alto: ${message.member.roles.highest.name}
📆 Entrou no servidor em: ${message.member.joinedAt.toLocaleDateString("pt-BR")}
    `);
  }

  // ?avatar
  if (message.content === "?avatar") {
    return message.reply({
      content: `🖼️ Avatar de ${message.author.username}`,
      files: [message.author.displayAvatarURL({ size: 1024 })]
    });
  }

  // ?dado
  if (message.content === "?dado") {
    const numero = Math.floor(Math.random() * 6) + 1;
    return message.reply(`🎲 Você rolou o dado e caiu no número **${numero}**!`);
  }

  // ?clear
  if (message.content.startsWith("?clear")) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("❌ Você não tem permissão para usar este comando.");
    }

    const args = message.content.split(" ");
    const quantidade = parseInt(args[1]);

    if (isNaN(quantidade) || quantidade < 1 || quantidade > 100) {
      return message.reply("❗ Use: `?clear 10` (1 a 100).");
    }

    await message.channel.bulkDelete(quantidade + 1, true);

    const aviso = await message.channel.send(`🗑️ ${quantidade} mensagens apagadas!`);
    setTimeout(() => {
      aviso.delete().catch(() => {});
    }, 3000);
  }
});

client.login(process.env.TOKEN);
