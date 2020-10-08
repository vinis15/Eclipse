var happycalculator = require('happycalculator');
module.exports.run = async (bot, message, args, idioma) => {
	if (!args.length) return message.reply(idioma.calc.args);
	try {
		var resultado = happycalculator.calculate(args.join(' ').split('÷').join('/'));
		if (resultado.toString().includes(bot.token)) return message.reply('TÁ TENTANDO PEGAR MEU TOKEN RAPA?');
		if (resultado === Infinity) return message.reply(idioma.calc.infinito);
		return message.reply('`' + resultado + '`');
	} catch {
		return message.reply(idioma.calc.erro);
	};
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["math", "calc", "calculate"]
}
exports.help = {
    nome: "calcular",
    descrição: "Faça uma conta com o bot",
    uso: "calc <CONTA>",
    categoria: "Outros"
}
