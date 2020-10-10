const { MessageEmbed } = require("discord.js");
const config = require("../../Structures/jsons/config.json");
const os = require("os");
const API = require("../../Structures/extensions/utils")
module.exports.run = async (bot, message, args, idioma) => {
    const embed = new MessageEmbed()
    .setTitle(`${idioma.botinfo.infos} | Eclipse`)
    .setColor(config.color)
	.setTimestamp()
    .addFields(
        { name: idioma.botinfo.versão, value: `\`\`\`${config.versão}\`\`\``, inline: true },
        { name: "Discord.js", value: `\`\`\`12.2.2\`\`\``, inline: true },
        { name: "Uptime", value: `\`\`\`${API.time2(bot.uptime)}\`\`\``, inline: true },
        { name: "Ping", value: `\`\`\`${bot.ws.ping}ms\`\`\``, inline: true },
        { name: idioma.botinfo.ram, value: `\`\`\`${API.bytes(process.memoryUsage().rss).value}${API.bytes(process.memoryUsage().rss).unit}/${API.bytes(os.totalmem()).value}${API.bytes(os.totalmem()).unit}\`\`\``, inline: true },
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
