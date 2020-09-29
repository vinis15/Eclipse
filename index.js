console.log("[LOGIN] - Iniciando conexão")
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require('enamp')
const bot = new Discord.Client({ disableMentions: 'everyone' })
const config = require("./config.json");
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const clientID = config.clientID;
const clientSecret = config.clientSecret;
const glob = require('glob')
const prefix = config.prefix
//Carregar idiomas.
require('./idiomas/pt')(bot)
require('./idiomas/en')(bot)

bot.idioma = new Enmap({name:'idiomas'})
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


glob(__dirname+'/commands/*/*.js', function (er, files) {
    if(er) console.log(er)
    files.forEach(f=>{
        let props = require(`${f.replace('.js', '')}`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        };})
    
    console.log("[COMANDOS] - Carregados com sucesso")
})


fs.readdir("./events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("[EVENTOS] - Não existem eventos para ser carregado");
    eventsFiles.forEach((file, i) => {
        require("./events/" + file);
    })
    console.log("[EVENTOS] - Carregados com sucesso")
});


bot.manager = new Manager({
    nodes: [{host: "localhost", password: "bonero", retryDelay: 5000, }],
    plugins: [new Spotify({clientID, clientSecret})],
    autoPlay: true,
    send: (id, payload) => {
      const guild = bot.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
})

    .on("nodeConnect", node => console.log(`[NODE] - ${node.options.identifier} conectado`))
    .on("nodeError", (node, error) => console.log(`[NODE] - ${node.options.identifier} encontrou um erro: ${error.message}.`))
    .on("trackStart", (player, track) => {
        let embed = new Discord.MessageEmbed()
        embed.setDescription(`**Tocando agora** \`${track.title}\``)
        embed.setTimestamp()
        embed.setColor(config.color)
        embed.setFooter(`Requisitado por ${track.requester.tag}`, `${track.requester.avatarURL({ dynamic: true, size: 2048 })}`)
        const channel = bot.channels.cache.get(player.textChannel);
        channel.send(embed).then(msg => player.set("message", msg));
    })
    .on("trackEnd", (player, track) => {
        if(player.get("message") && !player.get("message").deleted) player.get("message").delete();
    })
    .on("queueEnd", player => {
      const channel = bot.channels.cache.get(player.textChannel);
      channel.send("Saindo do canal de voz. Acabaram as músicas");
      player.destroy();
    });

    bot.once("ready", () => {
        bot.manager.init(bot.user.id);
    });

    bot.on("raw", d => bot.manager.updateVoiceState(d));

bot.login(config.token)
bot.badge = function(badges){
  return (badges.join(' ').replace('HOUSE_BALANCE', '<:balance:746939323143946320>').replace('HOUSE_BRILLIANCE', '<:Brilliance:746939322904870973>').replace('HOUSE_BRAVERY', '<:Bravery:746939322996883516>').replace('BUGHUNTER_LEVEL_1', '<:Hunter:750415765424963634>').replace('BUGHUNTER_LEVEL_2', '<:hunterv2:750415765496135700>').replace('VERIFIED_DEVELOPER', '<:developer:746940343252942956>').replace('DISCORD_PARTNER', '<:parceiro:750415765366112457>').replace('VERIFIED_BOT', '<:bot:750415765311717476>').replace('EARLY_SUPPORTER', '<:early:750416436458946773>').replace('HYPESQUAD_EVENTS', '<:hypesquad:750415765026635929>').replace('TEAM_USER', '<:funcionario:750415765655519403>').replace('SYSTEM', '<:funcionario:750415765655519403>') || 'Não possui')
}

module.exports = {
    bot,
    Manager
} 
