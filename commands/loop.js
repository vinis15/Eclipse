module.exports.run = async(bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send("Não tem nada tocando nesta guilda")

    const { channel } = message.member.voice

    if(!channel) return message.channel.send("Você tem que se conectar em algum canal de voz")

    if(channel.id !== player.voiceChannel) return message.channel.send("Se conecte ao mesmo canal de voz que eu")

    if(args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "ativado" : "desativado";
        return message.reply(`loop de queue foi ${queueRepeat}`);
      }
  
      player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? "ativado" : "desativado";
      return message.reply(`loop de música foi ${trackRepeat}`);
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