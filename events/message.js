//event handler function for the message event

//import commands from commands module
const events = require('../commands');

module.exports = (Bot, msg) => {
    if(msg.content === 'hi'){
        msg.reply('Boo!');
    }
    if(msg.content.startsWith("!shared-games")){
        events.sharedGames(Bot, msg);
    }
}