module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.loop.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.loop.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.loop.mesmo)

    if(player.queueRepeat == false) {
        player.queueRepeat == true
        return message.channel.send(idioma.loop.loopon)
    }

    if(player.queueRepeat == true) {
        player.queueRepeat = false
        return message.channel.send(idioma.loop.loopoff)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["repeat"]
}
exports.help = {
    nome: "loop",
    descrição: "Da loop na música ou na queue",
    uso: "loop",
    categoria: "Música"
}
