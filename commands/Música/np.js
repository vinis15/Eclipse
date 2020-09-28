const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require("moment")
var momentDurationFormatSetup = require("moment-duration-format");
const config = require("../../config.json")
module.exports.run = async(bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send("Não tem nada tocando nesta guilda")

    const { channel } = message.member.voice

    if(!channel) return message.channel.send("Você tem que se conectar em algum canal de voz")

    if(channel.id !== player.voiceChannel) return message.channel.send("Se conecte ao mesmo canal de voz que eu")
    const { title, author, duration, thumbnail } = player.queue.current;
    const embed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("NowPlaying.", message.author.avatarURL({dynamic: true, size: 2048}))
    .setThumbnail(thumbnail)
    .setTimestamp()
    .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`(${moment.duration(duration).format("d:hh:mm:ss")})(${moment.duration(player.position).format("d:hh:mm:ss")})\` \nPor **${author}**
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
