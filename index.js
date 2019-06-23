/*
Entry point file for SpookyBot
*/

//import environment variables
require('dotenv').config();

//import discord and initialize bot
const Discord = require('discord.js');
const Bot = new Discord.Client();

//include file manager library
const fs = require('fs');

//import all our event handlers
fs.readdir('./events/', (err, files) => {
        files.forEach(file => {
        const eventHandler = require(`./events/${file}`);   //function from file
        const eventName = file.split('.')[0];               //name of event handler
        Bot.on(eventName, (...args) => eventHandler(Bot, ...args)); //add listener to Bot
    });
})

//connect with discord
Bot.login(process.env.ACCESS_TOKEN);