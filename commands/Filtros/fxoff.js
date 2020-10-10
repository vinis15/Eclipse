module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.fxoff.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.fxoff.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.fxoff.mesmo)

    if(player.nightcore == false) {
        if(player.vaporwave == false) {
            if(player.bassboost == false)
            return message.channel.send(idioma.fxoff.naotem)
        }
    }
    if(player.nightcore == true) {
        player.clearEffects()
        return message.channel.send(idioma.fxoff.tem)
    }
    if(player.bassboost == true) {
        player.clearEffects()
        return message.channel.send(idioma.fxoff.tem)
    }
    if(player.vaporwave == true) {
        player.clearEffects()
        return message.channel.send(idioma.fxoff.tem)
    }
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}
exports.help = {
    nome: "fxoff",
    descrição: "Desativa todos os filtros",
    uso: "fxoff",
    categoria: "Filtros"
}