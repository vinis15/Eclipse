var happycalculator = require('happycalculator');
module.exports.run = async (bot, message, args) => {
	if (!args.length) return msg.reply('insira uma equação.');
	try {
		var resultado = happycalculator.calculate(args.join(' '));
		if (resultado.includes(bot.token)) return msg.reply('não foi possível calcular.');
		if (resultado === Infinity) return msg.reply('o resultado foi **Infinito**.');
		return msg.reply('`' + resultado + '`');
	} catch {
		return msg.reply('não foi possível calcular.');
	};
}

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
