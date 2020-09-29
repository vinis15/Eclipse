const config = require("../../config.json");
const mapping = {
  ' ': '   ',
  '0': '0️⃣',
  '1': '1️⃣',
  '2': '2️⃣',
  '3': '3️⃣',
  '4': '4️⃣',
  '5': '5️⃣',
  '6': '6️⃣',
  '7': '7️⃣',
  '8': '8️⃣',
  '9': '9️⃣',
  '!': '❕',
  '?': '❔',
  '#': '#️⃣',
  '*': '*️⃣',
  'Á': ':regional_indicator_a:',
  'Ã': ':regional_indicator_a:',
  'É': ':regional_indicator_e:',
  'â': ':regional_indicator_a:',
  'ã': ':regional_indicator_a:',
  'é': ':regional_indicator_e:'
};
module.exports.run = async (bot, message, args, idioma) => {
    if(!args.length) return message.reply(idioma.emojify.args)
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});
      
  let result = args.join(' ').split('').map(c => mapping[c] || c).join('')
  if(result.length>2000) return message.reply('o resultado foi muito grande')
  return message.channel.send(result)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["ify", "emoteify", "emotefy"]
}
exports.help = {
    nome: "emojify",
    descrição: "Transforma um texto em emoji",
    uso: "emojify <TEXTO>",
    categoria: "Outros"
}
