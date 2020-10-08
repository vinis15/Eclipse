const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const os = require("os");
const cpu = require('os-utils');
const byteSize = require('byte-size')
module.exports.run = async (bot, message, args, idioma) => {
    var uptime = process.uptime();
    var days = Math.floor((uptime % 31536000) / 86400);
    var hours = Math.floor((uptime % 86400) / 3600);
    var minutes = Math.floor((uptime % 3600) / 60);
    var seconds = Math.round(uptime % 60);
    var final = (days > 0 ? days + "d ":"") + (hours > 0 ? hours + "h ":"") + (minutes > 0 ? minutes + "m ":"") + (seconds > 0 ? seconds + "s":"")
    const embed = new MessageEmbed()
    .setTitle(`${idioma.botinfo.infos} | Eclipse`)
    .setColor(config.color)
	.setTimestamp()
    .addFields(
        { name: idioma.botinfo.versão, value: `\`\`\`${config.versão}\`\`\``, inline: true },
        { name: "Discord.js", value: `\`\`\`12.2.2\`\`\``, inline: true },
        { name: "Uptime", value: `\`\`\`${final}\`\`\``, inline: true },
        { name: "Ping", value: `\`\`\`${bot.ws.ping}ms\`\`\``, inline: true },
        { name: idioma.botinfo.ram, value: `\`\`\`${byteSize(process.memoryUsage().rss).value}${byteSize(process.memoryUsage().rss).unit}/${byteSize(os.totalmem()).value}${byteSize(os.totalmem()).unit}\`\`\``, inline: true },
        { name: idioma.botinfo.sistema, value: `\`\`\`${os.platform()}\`\`\``, inline: true },
        { name: idioma.botinfo.servidores, value: `\`\`\`${bot.guilds.cache.size.toLocaleString("pt-br")}\`\`\``, inline: true },
        { name: idioma.botinfo.usuarios, value: `\`\`\`${bot.users.cache.size.toLocaleString("pt-br")}\`\`\``, inline: true },
        { name: idioma.botinfo.músic, value: `\`\`\`${message.client.manager.players.size}\`\`\``, inline: true },
        { name: idioma.botinfo.processador, value: `\`\`\`${os.cpus()[0].model.toString().trim()}\`\`\``, inline: false }
    )
    return message.channel.send({embed})
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["bot-info"]
}
exports.help = {
    nome: "botinfo",
    descrição: "Mostra informaçoes do bot",
    uso: "",
    categoria: "Outros"
}
