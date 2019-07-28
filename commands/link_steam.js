
utils = require('../util');

//for access to our steam key
require('dotenv').config();

const steamtools = require('../Steam_Tools');



//Definition: command for linking a user tag to a username from steam
//Parameters: Bot - reference to the main Bot object
//            msg - reference to the msg that called the command
//            args - the remaining string after the call i.e. excluding
//                   !link-steam, can include a single steam username, or
//                   a tagged user followed by a username
module.exports = {
    name        : 'link-steam',
    description : 'Links a discord tag with a valid steam username',
    usage       : `${process.env.PREFIX}link-steam <tagged user> <steam user>\nOr to link yourself\n${process.env.PREFIX}link-steam <steam user>`,
    permissions : [],
    cooldown    : 3,
    execute(msg, args) {
        var user_to_link;   //discord user to link steam account to
        var linked_account; //steam account username
        if(args.length === 1){
            //case we want to link account to the msg senders account
            user_to_link = msg.author.tag;
            linked_account = args[0];
        }else if(args.length === 2 && msg.mentions.users.first()){
            //case we are linking accounts other than our own
            user_to_link = msg.mentions.users.first().tag;
            linked_account = args[1];
        }else{
            //invalid args            
            console.log('Command Failure: Invalid arguments');
            return false;
        }

        console.log(linked_account);
        steamtools.verifyUsername(linked_account, function(valid){
            if(valid){
                utils.addSteamAccountLink(user_to_link, linked_account);
                console.log('Linking success!');
                msg.channel.send(`Linked ${user_to_link} to steam account ${linked_account}`);
            }else{
                console.log("Invalid username");
                msg.channel.send('Steam username does not exist');
            }
        })


    }
}