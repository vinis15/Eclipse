const emoji = require('discord-emoji-convert');
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    let texto = args.join(' ');
    if(!texto) return message.channel.send(`Por favor use \`${config.prefix}emojify <TEXTO>\``)
    message.channel.send(emoji.convert(texto));
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["jify"]
}
exports.help = {
    nome: "emojify",
    descrição: "Transforma um texto em emoji",
    uso: "emojify <TEXTO>",
    categoria: "Outros"
}