const config = require("../../config.json")
const Discord = require("discord.js");
const embed = new Discord.MessageEmbed()


module.exports.run = async (bot, message, args) => {
    embed.setTitle("🧐 **|** Eclipse ping")
    embed.setColor(config.color)
    embed.setDescription(`**Latência:** \`${bot.ws.ping}ms\`\n**API:** \`${Date.now()-message.createdTimestamp}ms\``)
    return message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["p", "latencia"]
}
exports.help = {
    nome: "ping",
    descrição: "Mostra o ping do bot",
    uso: "",
    categoria: "Outros"
}
