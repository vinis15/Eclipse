const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const os = require("os");
const cpu = require('os-utils');
module.exports.run = async (bot, message, args) => {
    var uptime = process.uptime();
    var days = Math.floor((uptime % 31536000) / 86400);
    var hours = Math.floor((uptime % 86400) / 3600);
    var minutes = Math.floor((uptime % 3600) / 60);
    var seconds = Math.round(uptime % 60);
    var final = (days > 0 ? days + "d ":"") + (hours > 0 ? hours + "h ":"") + (minutes > 0 ? minutes + "m ":"") + (seconds > 0 ? seconds + "s":"")
    const embed = new MessageEmbed()
    .setTitle("Minhas informações | Eclipse")
    .setColor(config.color)
    .addFields(
        { name: "Minha versão", value: `\`\`\`${config.versão}\`\`\``, inline: true },
        { name: "Discord.js", value: `\`\`\`12.2.2\`\`\``, inline: true },
        { name: "Uptime", value: `\`\`\`${final}\`\`\``, inline: true },
        { name: "Ping", value: `\`\`\`${bot.ws.ping}ms\`\`\``, inline: true },
        { name: "Memória RAM Usada", value: `\`\`\`${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB\`\`\``, inline: true },
        { name: "Sistema Operacional", value: `\`\`\`${os.platform()}\`\`\``, inline: true },
        { name: "Servidores", value: `\`\`\`${bot.guilds.cache.size.toLocaleString("pt-br")}\`\`\``, inline: true },
        { name: "Usuários", value: `\`\`\`${bot.users.cache.size.toLocaleString("pt-br")}\`\`\``, inline: true },
        { name: "Músicas tocando", value: `\`\`\`${message.client.manager.players.size}\`\`\``, inline: true },
        { name: "Processador", value: `\`\`\`${os.cpus()[0].model.toString().trim()}\`\`\``, inline: false },
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
