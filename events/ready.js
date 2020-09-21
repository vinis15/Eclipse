const { bot } = require("../index");


bot.on("ready", () => {
    setStatus();
    setInterval(setStatus, 300000);
    console.log(`[INICIADO] - Bot iniciado com ${bot.guilds.cache.size} servidores`);
})


async function setStatus(){
    bot.user.setActivity(`Latencia de ${bot.ws.ping}ms`, {type: "PLAYING"})
}