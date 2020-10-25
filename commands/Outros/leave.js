module.exports.run = async (bot, message, args, idioma) => {

    const channel = message.guild.channels.cache.find(a => a.id === args[0] && a.type == 'voice') || message.member.voice.channel
if(!channel) return message.channel.send(idioma.join.joinErr);

channel.join();

message.channel.send(`${idioma.join.joinSucess} \`${channel.name}\``)

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["entrar"]
}
exports.help = {
    nome: "join",
    descrição: "Faz o bot entrar em um canal de voz",
    uso: "[canal]",
	categoria: "Outros"
}