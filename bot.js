const Discord = require('discord.js');
const client = new Discord.Client();
client.login(token.token);

const yichan = {
    height: 177,
    weight: 100
};
client.on('message', message => {
    if(message.content === '.status'){
        message.reply("신장:" + yichan.height);
        message.reply("체중:" + yichan.weight);
    }
})


