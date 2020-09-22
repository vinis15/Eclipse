const { bot } = require("../index");


bot.on("ready", () => {
    setStatus();
    setInterval(setStatus, 300000);
    console.log(`[LOGIN] - Bot iniciado com ${bot.guilds.cache.size} servidores`);
})


async function setStatus(){
    bot.user.setActivity(`Players [${bot.manager.players.size}]`, {type: "LISTENING"})
}