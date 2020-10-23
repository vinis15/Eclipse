const API = require("../../Structures/extensions/utils")
module.exports.run = async(bot, message, args) => {

    if(!API.eval.includes(message.author.id)) return message.reply('sem perm')

    if(bot.manutencao.get('Estado') === true) {
        bot.manutencao.set('Estado', false)
        return message.channel.send("Desativei o modo manutenção")
    }
    
    if(bot.manutencao.get('Estado') === false) {
        bot.manutencao.set('Estado', true)
        return message.channel.send("Ativei o modo manutenção")
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:['manu']
}

exports.help = {
  nome: "manutenção",
  descrição: "Manutenção",
  uso: "Manutenção",
  categoria: "Desenvolvedor",
}