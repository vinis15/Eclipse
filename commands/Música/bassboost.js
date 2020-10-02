module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.bassboost.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.bassboost.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.bassboost.mesmo)

    if(player.options.bassboost == false) {
        bot.manager.players.get(message.guild.id).setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: 0.5 })));
        player.options.bassboost = true
        return message.channel.send(idioma.bassboost.ativado)
    }
    if(player.options.bassboost == true) {
        bot.manager.players.get(message.guild.id).setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: 0.0 })));
        player.options.bassboost = false
        return message.channel.send(idioma.bassboost.desativado)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["bass"]
}
exports.help = {
    nome: "bassboost",
    descrição: "",
    uso: "Coloca um pouco de grave na música",
    categoria: "Música"
}