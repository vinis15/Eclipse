const { MessageEmbed } = require("discord.js")
const config = require("../../Structures/jsons/config.json")
const API = require("../../Structures/extensions/utils")
module.exports.run = async(bot, message, args, idioma) => {
    let embed = new MessageEmbed()
    embed.setColor(config.color)
    embed.setAuthor(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true, size: 2048})}`)
    embed.addFields(
        { name: "Players", value: `\`\`\`ini\n[ ${message.client.manager.nodes.get("LUA").stats.playingPlayers} ]\`\`\``, inline: true },
        { name: `${idioma.nodes.memoria}`, value: `\`\`\`diff\n- ${(message.client.manager.nodes.get("LUA").stats.memory.used/1024/1024).toFixed(2)}MB\`\`\``, inline: true },
        { name: "Node", value: `\`\`\`ini\n[ LUA ]\`\`\``, inline: true },
        { name: "Uptime", value: `\`\`\`glsl\n# ${API.time2(message.client.manager.nodes.get("LUA").stats.uptime)}\`\`\``, inline: false }
    )
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["nodesinfo"]
}
exports.help = {
    nome: "nodes",
    descrição: "Mostra status do lavalink",
    uso: "nodes",
    categoria: "Música"
}
