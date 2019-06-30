const utils = require('../util');

//Definition:   Listens for a msg authored by a given role to sarcastify their messages
//Parameters:   msg
module.exports = {
    name        : "sarcastify-listener",
    description : "listens for roles that have been specified by sarcastify role command",
    permissions : ["MANAGE_MESSAGES"],
    execute(msg){
        if(!utils.isSarcastified(msg.member.roles)){
            return;
        }

        msg.delete(20);
        msg.channel.send(`${utils.sarcastifyMessage(msg.content)} --${msg.member.displayName}`);
    }
}