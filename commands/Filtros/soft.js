module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.channel.send(idioma.nightcore.nada);

    if(args[0] && args[0].toLowerCase() == 'off') {
        player.setEqualizer(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0.15 })));
        return message.channel.send(idioma.soft.sucessOff)
    }

    player.setEqualizer([{ band: 0, gain: -0.05 }, { band: 1, gain: 0.07 }, { band: 2, gain: 0.16 }, { band: 3, gain: 0.03 }, { band: 4, gain: -0.05 }, { band: 5, gain: -0.11 }]);

message.channel.send(idioma.soft.sucessOn)
}

  exports.conf = {
        enabled: true,
        guildOnly: true,
        aliase: []
    }
      exports.help = {
        nome: "soft",
        descrição: "Liga o filtro soft",
        uso: "on/off",
        categoria: "Filtros"
    }