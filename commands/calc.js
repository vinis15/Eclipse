var happycalculator = require('happycalculator');
module.exports.run = async (bot, message, args) => {
	if (!args.length) return message.reply('insira uma equação.');
	try {
		var resultado = happycalculator.calculate(args.join(' '));
		if (resultado.toString().includes(bot.token)) return message.reply('não foi possível calcular.');
		if (resultado === Infinity) return message.reply('o resultado foi **Infinito**.');
		return message.reply('`' + resultado + '`');
	} catch(e) {
		console.log(e)
		return message.reply('não foi possível calcular.');
	};
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["math", "calc", "calculate"]
}
exports.help = {
    nome: "calcular",
    descrição: "Calcula uma equação informada pelo usuário.",
    uso: "calcular <equação>",
    categoria: "Outros"
}
