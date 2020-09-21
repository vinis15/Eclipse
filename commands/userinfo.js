const config = require("../config.json");
const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-BR');
const embed = new Discord.MessageEmbed()
module.exports.run = async (bot, message, args) => {
    if(!message.mentions.users.first()&&!args[0]) {
        embed.setTitle(`🧐 **|** ${message.author.tag} - (${message.author.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${message.author.tag}\`\n⇾ **Conta criada no dia:** \`${moment(message.author.createdAt).format("LLL")}\`\n⇾ **Entrou aqui no dia:** \`${moment(message.guild.members.cache.get(message.author.id).joinedAt).format("LLL")}\`\n⇾ **Emblemas:** ${message.author.flags.toArray().join(' ').replace('HOUSE_BALANCE', '<:balance:746939323143946320>').replace('HOUSE_BRILLIANCE', '<:Brilliance:746939322904870973>').replace('HOUSE_BRAVERY', '<:Bravery:746939322996883516>').replace('BUGHUNTER_LEVEL_1', '<:Hunter:750415765424963634>').replace('BUGHUNTER_LEVEL_2', '<:hunterv2:750415765496135700>').replace('VERIFIED_DEVELOPER', '<:developer:746940343252942956>').replace('DISCORD_PARTNER', '<:parceiro:750415765366112457>').replace('VERIFIED_BOT', '<:bot:750415765311717476>').replace('EARLY_SUPPORTER', '<:early:750416436458946773>').replace('HYPESQUAD_EVENTS', '<:hypesquad:750415765026635929>').replace('TEAM_USER', '<:funcionario:750415765655519403>').replace('SYSTEM', '<:funcionario:750415765655519403>') || 'Não possui'}`)
        embed.setThumbnail(`${message.author.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } 
    if(message.mentions.users.first()) {
        let mention = message.mentions.users.first()
        embed.setTitle(`🧐 **|** ${mention.tag} - (${mention.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${mention.tag}\`\n⇾ **Conta criada no dia:** \`${moment(mention.createdAt).format("LLL")}\`\n⇾ **Entrou aqui no dia:** \`${moment(message.guild.members.cache.get(`${mention.id}`).joinedAt).format("LLL")}\`\n⇾ **Emblemas:** ${mention.flags.toArray().join(' ').replace('HOUSE_BALANCE', '<:balance:746939323143946320>').replace('HOUSE_BRILLIANCE', '<:Brilliance:746939322904870973>').replace('HOUSE_BRAVERY', '<:Bravery:746939322996883516>').replace('BUGHUNTER_LEVEL_1', '<:Hunter:750415765424963634>').replace('BUGHUNTER_LEVEL_2', '<:hunterv2:750415765496135700>').replace('VERIFIED_DEVELOPER', '<:developer:746940343252942956>').replace('DISCORD_PARTNER', '<:parceiro:750415765366112457>').replace('VERIFIED_BOT', '<:bot:750415765311717476>').replace('EARLY_SUPPORTER', '<:early:750416436458946773>').replace('HYPESQUAD_EVENTS', '<:hypesquad:750415765026635929>').replace('TEAM_USER', '<:funcionario:750415765655519403>').replace('SYSTEM', '<:funcionario:750415765655519403>') || 'Não possui'}`)
        embed.setThumbnail(`${mention.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)  
    }
    if(isNaN(args[0])) return message.channel.send('Insira um ID')
    try {
        var member = await bot.users.fetch(args[0]);
        embed.setTitle(`🧐 **|** ${member.tag} - (${member.id})`)
        embed.setColor(config.color)
        embed.setDescription(`⇾ **Tag:** \`${member.tag}\`\n⇾ **Conta criada no dia:** \`${moment(member.createdAt).format("LLL")}\`\n⇾ **Emblemas:** ${member.flags.toArray().join(' ').replace('HOUSE_BALANCE', '<:balance:746939323143946320>').replace('HOUSE_BRILLIANCE', '<:Brilliance:746939322904870973>').replace('HOUSE_BRAVERY', '<:Bravery:746939322996883516>').replace('BUGHUNTER_LEVEL_1', '<:Hunter:750415765424963634>').replace('BUGHUNTER_LEVEL_2', '<:hunterv2:750415765496135700>').replace('VERIFIED_DEVELOPER', '<:developer:746940343252942956>').replace('DISCORD_PARTNER', '<:parceiro:750415765366112457>').replace('VERIFIED_BOT', '<:bot:750415765311717476>').replace('EARLY_SUPPORTER', '<:early:750416436458946773>').replace('HYPESQUAD_EVENTS', '<:hypesquad:750415765026635929>').replace('TEAM_USER', '<:funcionario:750415765655519403>').replace('SYSTEM', '<:funcionario:750415765655519403>') || 'Não possui'}`)
        embed.setThumbnail(`${member.displayAvatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } catch (err) {
        message.channel.send(":x: **Usuário não encontrado!**");
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliase: ["lockup"]
}
exports.help = {
    nome: "userinfo",
    descrição: "Mostra informaçoes de um usuario",
    uso: "userinfo [ID, MENÇÃO]",
    categoria: "Outros"
}