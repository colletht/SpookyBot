//event handler function for the message event

//import commands from commands module
const events = require('../commands');

module.exports = (Bot, msg) => {
    if(msg.content === 'hi'){
        msg.reply('Boo!');
    }
    if(msg.content.startsWith("!shared-games ")){
        events.sharedGames(Bot, msg, msg.content.replace("!shared-games ", ""));
    }
    if(msg.content.startsWith('!list-games ')){
        events.listGames(Bot, msg, msg.content.replace("!list-games ", ""));
    }
    if(msg.content.startsWith('!link-steam ')){
        events.linkSteam(Bot, msg, msg.content.replace('!link-steam ',''));
    }
    if(msg.content.startsWith('!remove-link-steam ')){
        events.removeLinkSteam(Bot, msg, msg.content.replace('!remove-link-steam ',''));
    }
}