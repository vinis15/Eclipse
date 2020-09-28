module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.reply("Não ha nada tocando")

    const { channel } = message.member.voice

    if(!channel) return message.reply("Você não esta em um canal de voz");
    if(channel.id !== player.voiceChannel) return message.reply("Você não esta no mesmo canal de voz que eue estou :/");

    if(player.queue.size <= 1) return message.channel.send("Não ha músicas por favor use e.stop")
    
    player.stop();
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["pular"]
}
exports.help = {
    nome: "skip",
    descrição: "Pula uma música",
    uso: "skip",
    categoria: "Música"
}
