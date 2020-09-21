const { bot } = require("../index");
const { MessageEmbed } = require("discord.js")
const config = require("../config.json");

bot.on("guildDelete", guild => {
  const embed  = new MessageEmbed()
  embed.setColor(config.color)
  embed.setTitle(`Saida de um servidor ${guild.name}`)
  embed.setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }) || 'https://www.ferramentastenace.com.br/wp-content/uploads/2017/11/sem-foto.jpg}')
  embed.addFields(
    { name: "Humanos", value: `${guild.members.cache.filter(m => !m.user.bot).size}`, inline: true },
    { name: "Bots", value: `${guild.members.cache.filter(m => m.user.bot).size}`, inline: true },
    { name: "Região", value: `${guild.region}`, inline: true },
    { name: "Dono", value: `${guild.owner.user.tag}`, inline: true },
    { name: "Nome do server", value: `${guild.name}`, inline: true },
    { name: "ID", value: `${guild.id}`, inline: true }
  )
  bot.users.cache.get("672652538880720896").send({embed})
})