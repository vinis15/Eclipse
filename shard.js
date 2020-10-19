const color = require("colors")
const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./index.js', { 
    totalShards: 2, 
    respawn: true, 
});

shard.on('shardCreate', shard => console.log(`[SHARD] - Iniciando shard ${shard.id}`.brightCyan));
shard.spawn();
