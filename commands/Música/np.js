const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require("moment")
require("moment-duration-format");
const config = require("../../config.json")
module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(`${idioma.np.nada}`)


    const { title, author, duration, thumbnail } = player.queue.current;
    const embed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("NowPlaying.", message.author.avatarURL({dynamic: true, size: 2048}))
    .setThumbnail(thumbnail)
    .setTimestamp()
    .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`(${moment.duration(duration).format("d:hh:mm:ss")})(${moment.duration(player.position).format("d:hh:mm:ss")})\` \n${idioma.np.por} **${author}**
            `);
    
            return message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["np", "playingnow"]
}
exports.help = {
    nome: "nowplaying",
    descrição: "Mostra a música tocando agora",
    uso: "nowplaying",
    categoria: "Música"
}
