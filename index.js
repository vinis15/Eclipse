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
    if(!files) return console.log("Não foi possivel achar comandos")
    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile <= 0){
        console.log("Não foi possivel achar comandos")
        return;
    }

    for (const f of jsfile){
        let props = require(`./commands/${f}`)
        console.log(`${f} Carregado.`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        }
    };
    console.log("Todos os comandos foram carregados com sucesso")
})

fs.readdir("./events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("Não existem eventos para ser carregado");
    console.log("Carregado: " + eventsFiles.length);
    eventsFiles.forEach((file, i) => {
        require("./events/" + file);
        console.log(`${i + 1}: ${file} carregado.`);
    });
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
    .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" conectado`))
    .on("nodeError", (node, error) => console.log(`Node "${node.options.identifier}" encontrou um erro: ${error.message}.`))
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


bot.on("message", async message => {
    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix = "e."
    if(message.guild) prefix = config.prefix
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return message.channel.send("Você não pode usar comandos na DM do bot").catch(e => bot.channels.cache.get("746448706772926554").send(e))
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = bot.aliases.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(bot,message,args);

})


bot.login(config.token)

module.exports = {
    bot,
    Manager
}