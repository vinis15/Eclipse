const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const moment = require('moment');
var momentDurationFormatSetup = require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;
  const eucanal = message.guild.me.voice.channel
  if(!channel) return message.reply('Por favor se conecte ao algum canal de voz e tente novamente');
  if(!args.length) return message.reply('Me de um LINK ou alguma PESQUISA');
  if(eucanal&&eucanal.id !== channel.id && !channel.joinable) return message.reply("Não posso me conectar a este canal")
  
  const player = message.client.manager.create({
    guild: message.guild.id,
    voiceChannel: channel.id,
    textChannel: message.channel.id,
    selfDeafen: true,
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

        let embed1 = new MessageEmbed()
        embed1.setTimestamp()
        embed1.setColor(config.color)
        embed1.setDescription(`**Adicionado a fila** \`${res.tracks[0].title}\`\n**Duração:** \`${moment.duration(res.tracks[0].duration).format("d:hh:mm:ss")}\``)
        embed1.setFooter(`Solicitado por ${res.tracks[0].requester.tag}`, `${res.tracks[0].requester.avatarURL({ dynamic: true, size: 2048 })}`)
        if(!player.playing && !player.paused && !player.queue.length) player.play();
        return message.channel.send(embed1);
        case 'PLAYLIST_LOADED':
          player.queue.add(res.tracks);
          if(!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();


          let embed2 = new MessageEmbed()
          embed2.setTimestamp()
          embed2.setColor(config.color)
          embed2.setDescription(`**Adicionado a playlist** \`${res.playlist.name}\` **com** \`${res.tracks.length}\` **músicas**\n**Duração de** \`${moment.duration(res.playlist.duration).format("d:hh:mm:ss")}\``)
          if(!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
          return message.channel.send(embed2);
          case 'SEARCH_RESULT':
            let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|cancelar)$/i.test(m.content);
            if(res.tracks.length < max) max = res.tracks.length;

            const results = res.tracks
            .slice(0, max)
            .map((track, index) => `${++index} - \`${track.title}\``)
            .join('\n');
            
            const embed = new MessageEmbed()
            .setColor(config.color)
            .setTimestamp()
            .addFields(
              { name: "Cancelar", value: `Digite \`cancelar\` para cancelar` }
            )
            .setDescription(results)
            message.channel.send(embed);

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
        
        let embed3 = new MessageEmbed()
        embed3.setColor(config.color)
        embed3.setFooter(`Solicitado por ${track.requester.tag}`, `${track.requester.avatarURL({ dynamic: true, size: 2048 })}`)
        embed3.setDescription(`**Adicionado a fila** \`${track.title}\` \n **Duração** \`${moment.duration(track.duration).format("d:hh:mm:ss")}\``)
        if (!player.playing && !player.paused && !player.queue.length) player.play();
        return message.channel.send(embed3);
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