require('dotenv').config();
const utils = require('../util');

//Description:  removes sarcastification of role
//Parameters:   A string
module.exports = {
    name        : "desarcastify-role",
    description : "All messages of given user into \"SarCAsTiC\" text",
    usage       : `${process.env.PREFIX}desarcastify-role <tagged role>`,
    permissions : [],
    cooldown    : 2,
    execute(msg, args){
        if(!args.length || !msg.mentions.roles){
            console.log('Command Failure: Invalid arguments');
            return false;
        }

        var applied_role = msg.mentions.roles.first().id;

        utils.deSarcastifyRole(applied_role);
    }
}