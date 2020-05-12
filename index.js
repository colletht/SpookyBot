/*
Entry point file for SpookyBot
*/

//import environment variables
require('dotenv').config();

//import discord and initialize bot
const Discord = require('discord.js');
const Bot = new Discord.Client();
Bot.commands = new Discord.Collection();

//include file manager library
const fs = require('file-system');

//read in all commands from command file
const cmd_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of cmd_files){
    const cmd = require(`./commands/${file}`);
    Bot.commands.set(cmd.name, cmd);
}

//import all our event handlers
fs.readdir('./events/', (err, files) => {
        files.forEach(file => {
        const eventHandler = require(`./events/${file}`);   //function from file
        const eventName = file.split('.')[0];               //name of event handler
        Bot.on(eventName, (...args) => eventHandler(Bot, ...args)); //add listener to Bot
    });
})

//connect with discord
Bot
    .login(process.env.ACCESS_TOKEN)
    .catch((err)=>console.log(err));