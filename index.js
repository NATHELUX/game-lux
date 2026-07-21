const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  ChannelType,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const prefix = "?";

const MOD_ROLE_ID = "1528100949770633297";
const TICKETS_CATEGORY_ID = "1528604493371936818";

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd === "ping") {
    return message.reply("🏓 Pong!");
  }

  if (cmd === "oi") {
    return message.reply(`👋 Olá, ${message.author.username}! Seja bem-vindo!`);
  }

  if (cmd === "ajuda") {
    return message.reply(`
📜 **Comandos**

🏓 ?ping
👋 ?oi
🌍 ?server
👤 ?userinfo
🖼 ?avatar
🎲 ?dado
🤖 ?botinfo
🗑 ?clear <quantidade>
🎫 ?teste
`);
  }

  if (cmd === "server") {
    const embed = new EmbedBuilder()
      .setTitle("🌍 Informações do servidor")
      .addFields(
        { name: "Nome", value: message.guild.name },
        { name: "Membros", value: `${message.guild.memberCount}` },
        { name: "ID", value: message.guild.id }
      );

    return message.reply({ embeds: [embed] });
  }

  if (cmd === "userinfo") {
    const user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setTitle("👤 Informações do usuário")
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Nome", value: user.username },
        { name: "ID", value: user.id }
      );

    return message.reply({ embeds: [embed] });
  }

  if (cmd === "avatar") {
    const user = message.mentions.users.first() || message.author;
    return message.reply(user.displayAvatarURL({ size: 1024 }));
  }

  if (cmd === "dado") {
    const numero = Math.floor(Math.random() * 6) + 1;
    return message.reply(`🎲 Você rolou o dado e caiu no número **${numero}**!`);
  }

  if (cmd === "botinfo") {
    const embed = new EmbedBuilder()
      .setTitle("🤖 Informações do bot")
      .addFields(
        { name: "Nome", value: client.user.username },
        { name: "Servidores", value: `${client.guilds.cache.size}` }
      );

    return message.reply({ embeds: [embed] });
  }

  if (cmd === "clear") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
      return message.reply("Sem permissão.");

    const quantidade = parseInt(args[0]);

    if (!quantidade || quantidade < 1 || quantidade > 100)
      return message.reply("Escolha um número de 1 a 100.");

    await message.channel.bulkDelete(quantidade, true);

    message.channel.send(`🗑 ${quantidade} mensagens apagadas!`);
  }

  if (cmd === "teste") {

    const canal = await message.guild.channels.create({
      name: `teste-${message.author.username}`,
      type: ChannelType.GuildText,
      parent: TICKETS_CATEGORY_ID,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["ViewChannel"]
        },
        {
          id: message.author.id,
          allow: ["ViewChannel", "SendMessages"]
        },
        {
          id: MOD_ROLE_ID,
          allow: ["ViewChannel", "SendMessages"]
        }
      ]
    });

    canal.send({
      content: `<@&${MOD_ROLE_ID}>`,
      embeds: [
        new EmbedBuilder()
          .setTitle("📝 Pedido de teste")
          .setDescription(`${message.author} abriu um pedido de teste.\n\nAguarde um moderador.`)
      ]
    });

    message.reply(`✅ Ticket criado: ${canal}`);
  }

});

client.login(process.env.TOKEN);
