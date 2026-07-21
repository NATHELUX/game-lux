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

  // Ping
  if (message.content === "?ping" || message.content === "!ping") {
    return message.reply("🏓 Pong!");
  }

  // Ajuda
  if (message.content === "?ajuda") {
    return message.reply(`
📜 **Comandos do Game-lux**

🏓 ?ping - Verifica se o bot está online.
📖 ?ajuda - Mostra esta lista de comandos.
👋 ?oi - O bot cumprimenta você.
🌐 ?server - Informações do servidor.
👤 ?userinfo - Informações do usuário.
🖼️ ?avatar - Mostra o avatar.
🎲 ?dado - Rola um dado.
🤖 ?botinfo - Informações do bot.
🗑️ ?clear <quantidade> - Apaga mensagens.
    `);
  }

  // Oi
  if (message.content === "?oi") {
    return message.reply(`👋 Olá, ${message.author.username}! Seja bem-vindo!`);
  }

  // Server
  if (message.content === "?server") {
    return message.reply(`
🌐 **Informações do servidor**

🏷️ Nome: ${message.guild.name}
👑 Dono: <@${message.guild.ownerId}>
👥 Membros: ${message.guild.memberCount}
🆔 ID: ${message.guild.id}
📅 Criado em: ${message.guild.createdAt.toLocaleDateString("pt-BR")}
    `);
  }

  // Userinfo
  if (message.content === "?userinfo") {
    return message.reply(`
👤 **Informações do usuário**

🏷️ Nome: ${message.author.username}
🆔 ID: ${message.author.id}
📅 Conta criada em: ${message.author.createdAt.toLocaleDateString("pt-BR")}
🎭 Cargo mais alto: ${message.member.roles.highest.name}
📅 Entrou no servidor em: ${message.member.joinedAt.toLocaleDateString("pt-BR")}
    `);
  }

  // Avatar
  if (message.content === "?avatar") {
    return message.reply({
      content: `🖼️ Avatar de ${message.author.username}`,
      files: [message.author.displayAvatarURL({ size: 1024 })]
    });
  }

  // Dado
  if (message.content === "?dado") {
    const numero = Math.floor(Math.random() * 6) + 1;
    return message.reply(`🎲 Você rolou o dado e caiu no número **${numero}**!`);
  }

  // Botinfo
  if (message.content === "?botinfo") {
    return message.reply(`
🤖 **Informações do Game-lux**

📛 Nome: ${client.user.username}
🆔 ID: ${client.user.id}
🏠 Servidores: ${client.guilds.cache.size}
👥 Usuários: ${client.users.cache.size}
⚡ Discord.js: v14
🟢 Status: Online
    `);
  }

  // Clear
  if (message.content.startsWith("?clear")) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("❌ Você não tem permissão para apagar mensagens.");
    }

    const args = message.content.split(" ");
    const quantidade = parseInt(args[1]);

    if (!quantidade || quantidade < 1 || quantidade > 100) {
      return message.reply("⚠️ Use: `?clear 10` (1 a 100).");
    }

    await message.channel.bulkDelete(quantidade, true);

    const msg = await message.channel.send(`🗑️ ${quantidade} mensagens apagadas!`);

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);
  }

});

client.login(process.env.TOKEN);
