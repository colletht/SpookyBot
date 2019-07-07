
const utils = require('../util');

//Description:  Changes all messages of given role into "SarCAsTiC"
//              text
//Parameters:   A string
module.exports = {
    name        : "sarcastify-role",
    description : "All messages sent by users with given role will be transformed into \"SarCAsTiC\" text",
    usage       : `${process.env.PREFIX}sarcastify-role <tagged role>`,
    permissions : ["MANAGE_MESSAGES"],
    cooldown    : 5,
    execute(msg, args){
        if(!args.length || !msg.mentions.roles){
            return false;
        }

        var applied_role = msg.mentions.roles.first().id;

        utils.sarcastifyRole(applied_role);
    }
}