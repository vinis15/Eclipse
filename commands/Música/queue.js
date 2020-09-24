const config = require("../config.json")
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.reply("Não a nada tocando infelizmente");

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`Fila de reprodução de ${message.guild.name}`);

    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField("Tocando agora", `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`Não ha músicas na ${page > 1 ? `pagina ${page}` : "fila"}.`);
    else embed.setDescription(tracks.map((track, i) => `**${start + (++i)} -** [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);
    embed.setColor(config.color)
    embed.setFooter(`Pagina ${page > maxPages ? maxPages : page} de ${maxPages}`);

    return message.channel.send(embed);
  }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["q", "fila"]
}
exports.help = {
    nome: "queue",
    descrição: "Mostra a fila de música",
    uso: "queue",
    categoria: "Música"
}
