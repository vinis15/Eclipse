const config = require("../../Structures/jsons/config.json")
const Discord = require("discord.js");
const embed = new Discord.MessageEmbed()


module.exports.run = async (bot, message, args, idioma) => {
    embed.setTitle("🧐 **|** Eclipse ping")
    embed.setColor(config.color)
    embed.setDescription(`${idioma.ping.latencia} \`${bot.ws.ping}ms\`\n**API:** \`${Date.now()-message.createdTimestamp}ms\``)
    return message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["latencia"]
}
exports.help = {
    nome: "ping",
    descrição: "Mostra o ping do bot",
    uso: "",
    categoria: "Outros"
}
