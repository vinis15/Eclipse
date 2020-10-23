const config = require("../Structures/jsons/config.json");
const { bot } = require("../index");
const ptbr = JSON.parse(JSON.stringify(bot.idiomas.pt))
const enus = JSON.parse(JSON.stringify(bot.idiomas.en))
const API = require("../Structures/extensions/utils")
bot.on("message", async message => {
    if(message.author.bot) return;
    let prefix;
    if(message.guild) prefix = config.prefix
    let messageArray = message.content.split(' ')
    let cmd = messageArray[0]
    let args = messageArray.slice(1);
    let idioma = bot.idioma.get(message.guild.id) || 'pt'
    if(!message.guild) return;
    if(!message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES') || !message.channel.permissionsFor(message.guild.me).missing('EMBED_LINKS')) return;
    switch (idioma.toLowerCase()) {
        case 'pt':
        idioma = ptbr
        break;
        case 'en':
        idioma = enus
        break;
        default:
        idioma = ptbr
        break;
    }
    if(message.content.startsWith('<@') && message.content.endsWith(bot.user.id + '>')) return message.channel.send(`${idioma.message.inico} **${message.author.tag}**, ${idioma.message.meio} \`${config.prefix}\`, ${idioma.message.use} \`${config.prefix}ajuda\` ${idioma.message.ou} \`${config.prefix}help\` ${idioma.message.final} ❤️`)
    if(!message.content.startsWith(prefix)) return;
    if(!API.eval.includes(message.author.id)) {
        if(bot.manutencao.get('Estado')) {
            return message.reply(idioma.manutencao.ativado)
        }
    }
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = bot.aliases.get(cmd.slice(prefix.length).toLowerCase())
    if(!message.guild) return;
    if(commandfile) commandfile.run(bot,message,args,idioma);
})