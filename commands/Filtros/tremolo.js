module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.tremolo.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.tremolo.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.tremolo.mesmo)

    if(player.tremolo == false) {
        player.setTremolo(true)
        return message.channel.send(idioma.tremolo.ativado)
    }

    if(player.tremolo == true) {
        player.setTremolo(false)
        return message.channel.send(idioma.tremolo.desativado)
    }
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}
exports.help = {
    nome: "tremolo",
    descrição: "Ativa o filtro tremolo na música",
    uso: "Tremolo",
    categoria: "Filtros"
}