const config = require("../../Structures/jsons/config.json");
const { MessageEmbed } = require("discord.js")
const API = require("../../Structures/extensions/utils")
const moment = require("moment")
module.exports.run = async (bot, message, args, idioma) => {
    const id = args[0].replace(/^<@!?(\d+)>$/gi, '') || message.author.id

    try {
        await bot.users.fetch(id);
      } catch (e) {
        return message.reply(idioma.avatar.invalido)
      }

      const user = bot.users.fetch(id);
      moment.locale(idioma.userinfo.locale)
      let embed = new MessageEmbed()
      .setTitle(`${API.status(user.presence.status)} **|** ${user.tag} - (${user.id})`)
      .setColor(config.color)
      .setThumbnail(`${user.avatarURL({ dynamic: true, size: 2048 })}`)
      .setTimestamp()
      if(message.guild.members.cache.get(user.id)) {
      embed.setDescription(`⇾ **Tag:** \`${user.tag}\`\n⇾ **${idioma.userinfo.criado}:** \`${API.moment(user.createdAt, 'LLL')}\`\n⇾ **${idioma.userinfo.entrou}:** \`${API.moment(message.guild.members.cache.get(user.id).joinedAt, 'LLL')}\`\n⇾ **${idioma.userinfo.emblemas}:** ${API.badges(user.flags.toArray())}`)
      } else {
        embed.setDescription(`⇾ **Tag:** \`${user.tag}\`\n⇾ **${idioma.userinfo.criado}:** \`${API.moment(user.createdAt, 'LLL')}\`\n⇾ **${idioma.userinfo.emblemas}:** ${API.badges(user.flags.toArray())}`)
      }
      message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["lookup", "whois"]
}
exports.help = {
    nome: "userinfo",
    descrição: "Mostra informaçoes de um usuario",
    uso: "userinfo [ID, MENÇÃO]",
    categoria: "Outros"
}
