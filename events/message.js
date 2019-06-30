//event handler function for the message event

require('dotenv').config();

//import commands from commands module
const fs = require('file-system');

const utils = require('../util');

const util_data = require('../server_data/util_data.json');

module.exports = (Bot, msg) => {
    //here we handle all standard command invokations
    if(msg.content.startsWith(process.env.PREFIX) && !msg.author.bot){

        const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
        var cmd = args.shift();
        
        if (Bot.commands.has(cmd)){
            cmd = Bot.commands.get(cmd);
            //check if user has permission to run command
            if(!utils.checkPermissions(cmd.permissions, msg.member)){
                msg.reply('You do not have permission to execute that command');
                return;
            //check if bot has permission to run command
            }else if(!utils.checkPermissions(cmd.permissions, Bot.guilds.get(msg.guild.id).me)){
                msg.reply('I do not have permission to execute that command');
                return;
            }else{
                try {
                    cmd.execute(msg, args);
                } catch (err) {
                    console.error(err);
                }
            }
        }
        return;
    }

    //handle custom command invokations here
    if(!msg.author.bot && -1 < msg.content.search(/i[ ]*[']*[ ]*m /i)){
        args = msg.content.split(msg.content.match(/i[ ]*[']*[ ]*m /i)[0])
        require('../custom_commands/dad_joke').execute(msg, args);
        return;
    }

    if(util_data.sarcastified && !msg.author.bot && Bot.guilds.get(msg.guild.id).me.hasPermission('MANAGE_MESSAGES')){
        require('../custom_commands/sarcastify_listener').execute(msg);
        return;
    }
}