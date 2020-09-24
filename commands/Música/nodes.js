const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const moment = require("moment")
var momentDurationFormatSetup = require("moment-duration-format");
module.exports.run = async(bot, message, args) => {
    let embed = new MessageEmbed()
    embed.setColor(config.color)
    embed.setAuthor(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true, size: 2048})}`)
    embed.addFields(
        { name: "Players", value: `\`\`\`ini\n[ ${message.client.manager.nodes.get("localhost").stats.playingPlayers} ]\`\`\``, inline: true },
        { name: "Uso de memoria", value: `\`\`\`diff\n- ${(message.client.manager.nodes.get("localhost").stats.memory.used/1024/1024).toFixed(2)}MB\`\`\``, inline: true },
        { name: "Node", value: `\`\`\`ini\n[ 1 ]\`\`\``, inline: true },
        { name: "Uptime", value: `\`\`\`glsl\n# ${moment.duration(message.client.manager.nodes.get("localhost").stats.uptime).format("d[d] h[h] m[m] s[s]")}\`\`\``, inline: false }

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
