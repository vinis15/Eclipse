const config = require("../config.json")
const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {

    if(config.eval.includes(message.author.id) == false) return message.channel.send("Sai irmão")

    if(!args[0]) return message.channel.send("Por favor me de um comando para dar reload!")

    let commands = args[0].toLowerCase()

    try {
        let categoria = bot.commands.get(commands).help.categoria
        delete require.cache[require.resolve(`./${commands}.js`)]
        bot.commands.delete(commands)
        const pull = require(__dirname+`/../${categoria}/${commands}.js`)
        bot.commands.set(commands, pull)
    } catch(e) {
        return message.channel.send(`Não foi possível recarregar: \`${args[0].toUpperCase()}\`` + e)
    }

    message.channel.send(`O comando \`${args[0].toUpperCase()}\` foi atualizado!`)

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliase: []
}
exports.help = {
    nome: "reload",
    descrição: "",
    uso: "reload <COMANDO>",
    categoria: "Outros"
}
