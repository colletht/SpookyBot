//event handler function for the message event

require('dotenv').config();

//import commands from commands module
const fs = require('file-system');

module.exports = (Bot, msg) => {
    //here we handle all standard command invokations
    if(msg.content.startsWith(process.env.PREFIX) && !msg.author.bot){

        const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
        const cmd = args.shift();
        
        if (Bot.commands.has(cmd)){

            try {
                Bot.commands.get(cmd).execute(msg, args);
            } catch (err) {
                console.error(err);
            }
        }
    }

    //handle custom command invokations here
    if(!msg.author.bot && -1 < msg.content.search(/i[']?m/i)){
        args = msg.content.split(msg.content.match(/i[']?m/i)[0])
        require('../custom_commands/dad_joke').execute(msg, args);
    }
}