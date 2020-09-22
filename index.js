console.log("[LOGIN] - Iniciando bot")
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableMentions: 'everyone' })
const config = require("./config.json");
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const clientID = config.clientID;
const clientSecret = config.clientSecret;

const prefix = config.prefix
bot.commands = new Discord.Collection(undefined,undefined);
bot.aliases = new Discord.Collection(undefined,undefined);

fs.readdir("./commands/", async (err, files) => {

    if(err) console.log(err)
    if(!files) return console.log("[ERRO] - Não foi possivel achar comandos")
    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile <= 0){
        console.log("[ERRO] - Não foi possivel achar comandos")
        return;
    }

    for (const f of jsfile){
        let props = require(`./commands/${f}`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        }
    };
    console.log("[COMANDOS] - Carregados com sucesso")
})

fs.readdir("./events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("[ERRO] - Não existem eventos para ser carregado");
    eventsFiles.forEach((file, i) => {
        require("./events/" + file);
    });
    console.log("[EVENTOS] - Carregados com sucesso")
});

bot.on("raw", d => bot.manager.updateVoiceState(d));

bot.manager = new Manager({
    nodes: [{host: "localhost", password: "bonero", retryDelay: 5000, }],
    plugins: [new Spotify({clientID, clientSecret})],
    autoPlay: true,
    send: (id, payload) => {
      const guild = bot.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
})
    .on("nodeConnect", node => console.log(`[NODE] - ${node.options.identifier} Conectado`))
    .on("nodeError", (node, error) => console.log(`[NODE] - ${node.options.identifier} encontrou um erro: ${error.message}.`))
    .on("trackStart", (player, track) => {
      const channel = bot.channels.cache.get(player.textChannel);
      channel.send(`Tocando agora: \`${track.title}\`, pedido por \`${track.requester.tag}\`.`);
    })
    .on("queueEnd", player => {
      const channel = bot.channels.cache.get(player.textChannel);
      channel.send("Saindo do canal de voz, pos a música terminou");
      player.destroy();
    });

    bot.once("ready", () => {
        bot.manager.init(bot.user.id);
    });


bot.login(config.token)

module.exports = {
    bot,
    Manager
}