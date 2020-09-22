const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const moment = require('moment');
var momentDurationFormatSetup = require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;

  if(!channel) return message.reply('Por favor se conecte ao algum canal de voz e tente novamente');
  if(!channel.joinable) return message.reply("Não posso me conectar a este canal")
  if(!args.length) return message.reply('Me de um LINK ou alguma PESQUISA');

  const player = message.client.manager.create({
    guild: message.guild.id,
    voiceChannel: channel.id,
    textChannel: message.channel.id,
    selfDeafen: true,
    volume: 50
  });

    player.connect();

  const search = args.join(' ');
    let res;


    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
      }
    } catch (err) {
      return message.reply(`Ouve uma falha desculpa: ${err.message}`);
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.reply('Desculpa não achei resultados.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if(!player.playing && !player.paused && !player.queue.length) player.play();
        return message.reply(`Adicionado a fila \`${res.tracks[0].title}\` \nDuração (${moment.duration(res.tracks[0].duration).format("d:hh:mm:ss")}).`);
        case 'PLAYLIST_LOADED':
          player.queue.add(res.tracks);
          if(!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();


          if(!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
          return message.reply(`Adicionado a fila \`${res.playlist.name}\` com ${res.tracks.length} músicas. \nDuração (${moment.duration(res.playlist.duration).format("d:hh:mm:ss")})`);
          case 'SEARCH_RESULT':
            let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|cancelar)$/i.test(m.content);
            if(res.tracks.length < max) max = res.tracks.length;

            const results = res.tracks
            .slice(0, max)
            .map((track, index) => `${++index} - \`${track.title}\``)
            .join('\n');
            
            const embed = new MessageEmbed()
            .setColor(config.color)
            .addFields(
              { name: "Cancelar", value: `Digite \`cancelar\` para cancelar` }
            )
            .setDescription(results)
            message.channel.send({embed});

            try {
              collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
            } catch (e) {
              if (!player.queue.current) player.destroy();
              return message.reply("acabou o tempo de seleção");
            }

            const first = collected.first().content;

            if (first.toLowerCase() === 'cancelar') {
              if (!player.queue.current) player.destroy();
              return message.channel.send('Seleção cancelada');
            }
            
            const index = Number(first) - 1;
        if (index < 0 || index > max - 1) return message.reply(`O número que você forneceu muito pequeno ou muito grande (1-${max}).`);

        const track = res.tracks[index];
        player.queue.add(track);

        if (!player.playing && !player.paused && !player.queue.length) player.play();
        return message.reply(`Adicionado a fila \`${track.title}\` (${moment.duration(track.duration).format("d:hh:mm:ss")}).`);
      }
    };



exports.conf = {
        enabled: true,
        guildOnly: true,
        aliase: ["tocar", "p"]
}
exports.help = {
        nome: "play",
        descrição: "Toca uma música",
        uso: "play <MUSGA>",
        categoria: "Música"
}