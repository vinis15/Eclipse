String.prototype.toFullWidth = function() {
	return this.replace(/[A-Za-z0-9]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
	});
module.exports.run = async (bot, message, args) => {
    
		if (!args.length)
			return msg.reply('insira um texto para transformar em vaporwave.')
        try {
        return message.channel.send(args.join(' ').toFullWidth());
	} catch (err) {
	  return message.reply('o resultado foi muito grande.');
	}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["vapor-wave", "vaporonda", "aesthetic"]
}
exports.help = {
    nome: "vaporwave",
    descrição: "Transforma um texto em vaporwave.",
    uso: "vaporwave <texto>",
    categoria: "Outros"
}
