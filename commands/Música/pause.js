module.exports.run = async(bot, message, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.pause.noplaying)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.loop.conectar)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.loop.conectar2)

    if(player.paused) return message.channel.send(idioma.pause.already)

    player.pause(true)
    return message.reply(idioma.loop.paused)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["pausar"]
}
exports.help = {
    nome: "pause",
    descrição: "Pausa a música",
    uso: "pause",
    categoria: "Música"
}
