const { MessageEmbed } = require("discord.js");
const config = require("../../Structures/jsons/config.json")

module.exports.run = async (bot, message, args, idioma) => {
    const id = args[0].replace(/^<@!?(\d+)>$/gi, '') || message.author.id

    try {
        await bot.users.fetch(id);
      } catch (e) {
        return message.reply(idioma.avatar.invalido)
      }

      const user = bot.users.fetch(id);

       message.channel.send(new MessageEmbed()
       .setTitle(id == message.author.id ? `${idioma.avatar.seu} 🖼️` : `${idioma.avatar.de} ${user.tag} 🖼️`)
       .setColor(config.color)
       .setImage(user.avatarURL({ dynamic: true, size: 2048 }))
       .setTimestamp()
       )
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["av"]
}
exports.help = {
    nome: "avatar",
    descrição: "Mostra o avatar",
    uso: "avatar [ID, MENÇÃO]",
    categoria: "Outros"
}
