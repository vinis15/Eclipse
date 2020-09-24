module.exports.run = async(bot, message) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send("Não tem nada tocando nesta guilda")

    const { channel } = message.member.voice

    if(!channel) return message.channel.send("Você tem que se conectar em algum canal de voz")

    if(channel.id !== player.voiceChannel) return message.channel.send("Se conecte ao mesmo canal de voz que eu")

    if(!player.paused) return message.channel.send("A musica não esta pausada")

    player.pause(false)
    return message.reply("Musica despausada")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["despausar"]
}
exports.help = {
    nome: "resume",
    descrição: "Despausa a música",
    uso: "resume",
    categoria: "Música"
}
