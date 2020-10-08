module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.nightcore.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.nightcore.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.nightcore.mesmo)

    if(player.nightcore == false) {
        if(player.options.bassboost == true) {
            bot.manager.players.get(message.guild.id).setEQ(...new Array(6).fill(null).map((_, i) => ({ band: i, gain: 0.0 })));
            player.options.bassboost = false
        }
        player.setNightcore(true)
        return message.channel.send(idioma.nightcore.ativado)
    } 
    if(player.nightcore == true) {
        player.setNightcore(false)
        return message.channel.send(idioma.nightcore.desativado)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["night"]
}
exports.help = {
    nome: "nightcore",
    descrição: "Ativa o filtro nightcore na música",
    uso: "nightcore",
    categoria: "Filtros"
}