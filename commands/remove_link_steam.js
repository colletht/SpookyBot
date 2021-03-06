

//for access to our steam key
require('dotenv').config();

util = require('../util');

//Definition: Removes a previously linked tag:steam account pair from the database
//            If the tag is not in the database nothing is changed
//Parameters: Bot - reference to the main Bot object
//            msg - reference to the msg that called the command
//            args - the remaining string after the call i.e. excluding
//                   !remove-link-steam, can include a tag, or no argument
//                   in which case the author of the messages's tag is used
module.exports = {
    name        : 'remove-link-steam',
    description : 'Allows a user to remove their, or anothers users steam linkage with the bot',
    usage       : `${process.env.PREFIX}remove-link-steam <tagged user> <steam user>\nOr to delink yourself\n${process.env.PREFIX}remove-link-steam <steam user>`,
    permissions : [],
    cooldown    : 5,
    execute(msg, args) {
        var user_to_unlink;

        if(args.length == 0){
            user_to_unlink = msg.author.tag;
        }else if(args.length == 1 && msg.mentions.users.first()){
            user_to_unlink = msg.mentions.users.first().tag;
        }else{
            return false;
        }

        utils.rmSteamAccountLink(user_to_unlink);
        msg.reply("Removed account linked to " + msg.mentions.users.first());
    }
}
