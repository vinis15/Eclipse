const { bot } = require("../index");


bot.on("ready", () => {
    setStatus();
    setInterval(setStatus, 300000);
    console.log("Bot ligou!");
})


async function setStatus(){
    bot.user.setActivity(`Latencia de ${bot.ws.ping}ms`, {type: "WATCHING"})
}