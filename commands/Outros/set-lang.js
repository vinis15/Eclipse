const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('../../database.json')
const db = low(adapter)
module.exports.run = async (bot, message, args) => {
    db.get(`${message.guild.id}`).push({
        language: "ingles"
    }).write()
    return message.channel.send("Ok i will speak english in this guild")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}
exports.help = {
    nome: "set-lang",
    descrição: "Altera o idioma do bot",
    uso: "set-lang",
    categoria: "Outros"
}