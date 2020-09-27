module.exports.run = async(bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send("Não tem nada tocando nesta guilda")
    if(!args.length) return message.channel.send(`O volume do players esta em \`${player.volume}\``)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send("Você tem que se conectar em algum canal de voz")

    if(channel.id !== player.voiceChannel) return message.channel.send("Se conecte ao mesmo canal de voz que eu")

    const volume = Number(args[0]);
    if (!volume || volume < 1 || volume > 100) return message.reply("Você tem que dar um volume entre 1 a 100");
    player.setVolume(volume);
    return message.reply(`Setado volume do player em \`${volume}\`.`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["vol"]
}
exports.help = {
    nome: "volume",
    descrição: "",
    uso: "Aumenta ou diminiu o volume",
    categoria: "Música"
}
