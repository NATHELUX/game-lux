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

const PREFIX = "?";

const MOD_ROLE_ID = "1528100949770633297";
const DONOS_ROLE_ID = "1528104256589140008";
const TICKETS_CATEGORY_ID = "1528604493371936818";

client.once("ready", () => {
console.log(`✅ ${client.user.tag} ligado!`);
});

client.on("messageCreate", async (message) => {

if (message.author.bot) return;
if (!message.guild) return;
if (!message.content.startsWith(PREFIX)) return;

const args = message.content.slice(PREFIX.length).trim().split(/ +/);
const cmd = args.shift().toLowerCase();

if (cmd === "ping") {
return message.reply("🏓 Pong!");
}

if (cmd === "oi") {
return message.reply(`👋 Olá ${message.author}!`);
}

if (cmd === "ajuda") {

const embed = new EmbedBuilder()
.setColor("Blue")
.setTitle("📜 Comandos")
.setDescription(`
🏓 ?ping
👋 ?oi
🌍 ?server
👤 ?userinfo
🖼 ?avatar
🎲 ?dado
🤖 ?botinfo
🗑 ?clear
🎫 ?teste
🔒 ?fechar
`);

return message.reply({ embeds:[embed] });

}
if (cmd === "server") {

const embed = new EmbedBuilder()
.setColor("Green")
.setTitle("🌍 Informações do Servidor")
.addFields(
{ name: "🏷️ Nome", value: message.guild.name, inline: true },
{ name: "👥 Membros", value: `${message.guild.memberCount}`, inline: true },
{ name: "🆔 ID", value: message.guild.id, inline: false }
)
.setTimestamp();

return message.reply({ embeds: [embed] });

}

if (cmd === "userinfo") {

const user = message.mentions.users.first() || message.author;

const embed = new EmbedBuilder()
.setColor("Blue")
.setTitle("👤 Informações do Usuário")
.setThumbnail(user.displayAvatarURL({ dynamic: true }))
.addFields(
{ name: "🏷️ Nome", value: user.username, inline: true },
{ name: "🆔 ID", value: user.id, inline: true },
{
name: "📅 Conta criada",
value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`
}
)
.setTimestamp();

return message.reply({ embeds: [embed] });

}

if (cmd === "avatar") {

const user = message.mentions.users.first() || message.author;

const embed = new EmbedBuilder()
.setColor(0x5865F2)
.setTitle(`🖼️ Avatar de ${user.username}`)
.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }));

return message.reply({ embeds: [embed] });

}

if (cmd === "dado") {

const numero = Math.floor(Math.random() * 6) + 1;

return message.reply(`🎲 Você tirou **${numero}**!`);

  }
  if (cmd === "botinfo") {

const embed = new EmbedBuilder()
.setColor("Gold")
.setTitle("🤖 Informações do Game-lux")
.addFields(
{ name: "🤖 Nome", value: client.user.username, inline: true },
{ name: "🌐 Servidores", value: `${client.guilds.cache.size}`, inline: true },
{ name: "👥 Usuários", value: `${client.users.cache.size}`, inline: true },
{ name: "⚡ Discord.js", value: "v14", inline: true }
)
.setTimestamp();

return message.reply({ embeds: [embed] });

}

if (cmd === "clear") {

if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
return message.reply("❌ Você não possui permissão para apagar mensagens.");
}

const quantidade = parseInt(args[0]);

if (!quantidade || quantidade < 1 || quantidade > 100) {
return message.reply("⚠️ Informe um número entre **1** e **100**.");
}

await message.channel.bulkDelete(quantidade, true);

const aviso = await message.channel.send(`🗑️ **${quantidade}** mensagens apagadas.`);

setTimeout(() => {
aviso.delete().catch(() => {});
}, 5000);

return;

}
if (cmd === "teste") {

const existente = message.guild.channels.cache.find(
c =>
c.parentId === TICKETS_CATEGORY_ID &&
c.name === `teste-${message.author.username.toLowerCase()}`
);

if (existente) {
return message.reply(`❌ Você já possui um ticket aberto: ${existente}`);
}

const canal = await message.guild.channels.create({
name: `teste-${message.author.username.toLowerCase()}`,
type: ChannelType.GuildText,
parent: TICKETS_CATEGORY_ID,

permissionOverwrites: [
{
id: message.guild.roles.everyone.id,
deny: [PermissionsBitField.Flags.ViewChannel]
},
{
id: message.author.id,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
},
{
id: MOD_ROLE_ID,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
},
{
id: DONOS_ROLE_ID,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
}
]
});

const embed = new EmbedBuilder()
.setColor("Blue")
.setTitle("🎫 Pedido de Teste")
.setDescription(
`Olá ${message.author}!

Seu ticket foi criado com sucesso.

📋 Explique qual teste deseja realizar.

⏳ Aguarde um membro da equipe responder.`
)
.setFooter({ text: "Game-lux" })
.setTimestamp();

await canal.send({
content: `<@&${MOD_ROLE_ID}> <@&${DONOS_ROLE_ID}>`,
embeds: [embed]
});

return message.reply(`✅ Ticket criado: ${canal}`);

}
 if (cmd === "fechar") {

if (
!message.member.roles.cache.has(MOD_ROLE_ID) &&
!message.member.roles.cache.has(DONOS_ROLE_ID)
) {
return message.reply("❌ Apenas MODs e DONOS podem fechar tickets.");
}

if (message.channel.parentId !== TICKETS_CATEGORY_ID) {
return message.reply("❌ Este comando só pode ser usado em um ticket.");
}

await message.reply("🔒 Fechando ticket em 5 segundos...");

setTimeout(async () => {
await message.channel.delete().catch(() => {});
}, 5000);

return;

}

});

client.login(process.env.TOKEN); 
