module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.loop.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.loop.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.loop.mesmo)

    if(args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? idioma.loop.ativado : idioma.loop.desativado;
        return message.reply(`${idioma.loop.queue} ${queueRepeat}`);
      }
  
      player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? idioma.loop.ativado : idioma.loop.desativado;
      return message.reply(`${idioma.loop.musica} ${trackRepeat}`);
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
