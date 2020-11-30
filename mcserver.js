const util = require('minecraft-server-util');
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(token.token);


// IMPORTANT: You need to run "npm i minecraft-server-util@^3.0.1 discord.js@^12.3.1" (without quotes) in your terminal before executing this script

const server = {
    ip: 'mumu.apexmc.co', // Put your minecraft server IP or hostname here (e.g. '192.168.0.1')
    port: 19606 // Put your minecraft server port here (25565 is the default)
};
const commands = {
    status: {
        command: '.status',
        text: {
            error: '무무서버는 현재 오프라인입니다.', // Check your terminal when you see this
            online: '무무서버는 현재 온라인입니다.  -  ',
            players: '**{online}** 명이 현재 온라인입니다!', // {online} will show player count
            noPlayers: '그러나 아무도 없네요 ㅜㅜ'
        }
        
    },
    ip: {
        command: '.ip',
        text: {
            main: '무무서버의 주소는 `{ip}:{port}` 입니다.' // {ip} and {port} will show server ip and port from above
        }
    }
};

// Do not edit below this line unless you know what you're doing

const cacheTime = 30 * 1000;
let data, lastUpdated = 0;

client.on('message', message => {
    if(message.content.trim() == commands.status.command) {
        statusCommand(message)
    } else if(message.content.trim() == commands.ip.command) {
        ipCommand(message)
    }
});

function statusCommand(message) {
    if(Date.now() > lastUpdated + cacheTime) {
        util.statusBedrock(server.ip, { port: server.port })
        .then(res => {
            data = res;
            lastUpdated = Date.now();
            replyStatus(message)
        })
        .catch(err => {
            console.error(err);
            return message.reply(commands.status.text.error);
        });
    } else { // Use cached data
        replyStatus(message)
    }
}

function replyStatus(message) {
    let { text } = commands.status;
    let status = text.online;
    status += data.onlinePlayers ? text.players : text.noPlayers;
    status = status.replace('{online}', data.onlinePlayers);
    message.reply(status);
}

function ipCommand(message) { // Handle IP command
    message.reply(commands.ip.text.main.replace('{ip}', server.ip).replace('{port}', server.port));
}