module.exports.run = async(bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send("Não tem nada tocando nesta guilda")

    const { channel } = message.member.voice

    if(!channel) return message.channel.send("Você tem que se conectar em algum canal de voz")

    if(channel.id !== player.voiceChannel) return message.channel.send("Se conecte ao mesmo canal de voz que eu")

    player.queue.shuffle();
    return message.reply("Queue embaralhada")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["shu"]
}
exports.help = {
    nome: "shuffle",
    descrição: "",
    uso: "Embaralha a queue",
    categoria: "Música"
}
