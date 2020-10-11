const config = require("../../Structures/jsons/config.json");
const { MessageEmbed } = require("discord.js")
const moment = require('moment');
const API = require("../../Structures/extensions/utils")
module.exports.run = async (bot, message, args, idioma) => {
    let embed = new MessageEmbed()
    moment.locale(idioma.userinfo.locale);
    if(!message.mentions.users.first()&&!args[0]) {
        embed.setTitle(`${API.status(message.author.presence.status)} **|** ${message.author.tag} - (${message.author.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${message.author.tag}\`\n⇾ **${idioma.userinfo.criado}:** \`${moment(message.author.createdAt).format("LLL")}\`\n⇾ **${idioma.userinfo.entrou}:** \`${moment(message.guild.members.cache.get(message.author.id).joinedAt).format("LLL")}\`\n⇾ **${idioma.userinfo.emblemas}:** ${API.badges(message.author.flags.toArray())}`)
        embed.setThumbnail(`${message.author.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } 
    if(message.mentions.users.first()) {
        let mention = message.mentions.users.first()
        embed.setTitle(`${API.status(mention.presence.status)} **|** ${mention.tag} - (${mention.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${mention.tag}\`\n⇾ **${idioma.userinfo.criado}:** \`${moment(mention.createdAt).format("LLL")}\`\n⇾ **${idioma.userinfo.entrou}:** \`${moment(message.guild.members.cache.get(`${mention.id}`).joinedAt).format("LLL")}\`\n⇾ **${idioma.userinfo.emblemas}:** ${API.badges(mention.flags.toArray())}`)
        embed.setThumbnail(`${mention.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)  
    }
    if(isNaN(args[0])) return message.reply(`${idioma.userinfo.invalido}`)
    try {
        let member = await bot.users.fetch(args[0]);
        embed.setTitle(`${API.status(member.presence.status) ? "<:off:757819465915170836>" : "<:off:757819465915170836>"} **|** ${member.tag} - (${member.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${member.tag}\`\n⇾ **${idioma.userinfo.criado}:** \`${moment(member.createdAt).format("LLL")}\`\n⇾ **${idioma.userinfo.emblemas}:** ${API.badges(member.flags.toArray())}`)
        embed.setThumbnail(`${member.displayAvatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } catch {
        message.channel.send(`:x: **${idioma.userinfo.erro}**`);
    }
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
