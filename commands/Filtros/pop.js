module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.channel.send(idioma.nightcore.nada);

    if(args[0] && args[0].toLowerCase() == 'off') {
        player.setEqualizer(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0 })));
     return message.channel.send(idioma.pop.sucessOff)
    }

    player.setEqualizer([{
        band: 0,
        gain: -0.25
    },
    {
        band: 1,
        gain: 0.48
    },
    {
        band: 2,
        gain: 0.59
    },
    {
        band: 3,
        gain: 0.72
    },
    {
        band: 4,
        gain: 0.56
    },
    {
        band: 5,
        gain: 0.15
    },
    {
        band: 6,
        gain: -0.24
    },
    {
        band: 7,
        gain: -0.24
    },
    {
        band: 8,
        gain: -0.16
    },
    {
        band: 9,
        gain: -0.16
    },
    {
        band: 10,
        gain: 0
    },
    {
        band: 11,
        gain: 0
    },
    {
        band: 12,
        gain: 0
    },
    {
        band: 13,
        gain: 0
    }
]);

message.channel.send(idioma.pop.sucessOn)


}

  exports.conf = {
        enabled: true,
        guildOnly: true,
        aliase: []
    }
      exports.help = {
        nome: "pop",
        descrição: "Liga o filtro pop",
        uso: "on/off",
        categoria: "Filtros"
    }