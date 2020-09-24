const config = require("../../config.json");
const glob = require("glob")

module.exports.run = async (bot, message, args) => {

    if(config.eval.includes(message.author.id) == false) return message.channel.send("Sai irmão")

bot.commands.clear()  
glob(__dirname+'/../*/*.js', function (er, files) {
    if(er) { console.log(er); return msg.reply('não foi possível recarregar todos os comandos.'); }
    files.forEach(f=>{
        let props = require(`${f.replace('.js', '')}`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        };})
    
    console.log("[COMANDOS] - Comandos carregados com sucesso")
})

    message.channel.send(`Comandos recarregados!`)

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
