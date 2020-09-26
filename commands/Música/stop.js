module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.reply("Não ha nada tocando")

    const { channel } = message.member.voice

    if(!channel) return message.reply("Você não esta em um canal de voz");
    if (channel.id !== player.voiceChannel) return message.reply("Você não esta no mesmo canal de voz que que eu estou :/");

    player.destroy();
    return message.channel.send("Parei de tocar");
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["parar"]
}
exports.help = {
    nome: "stop",
    descrição: "Para de tocar música",
    uso: "stop",
    categoria: "Música"
}
