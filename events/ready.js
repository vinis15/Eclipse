const { bot } = require("../index");
const color = require("colors")


bot.on("ready", () => {
    setStatus();
    setInterval(setStatus, 300000);
    console.log(`[LOGIN] - Bot iniciado com ${bot.guilds.cache.size} servidores`.brightCyan);
    console.log(`[LOGIN] - Memoria usada ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB`.bold.brightCyan)
})


async function setStatus(){
    bot.user.setActivity(`Players [${bot.manager.players.size}]`, {type: "LISTENING"})
}