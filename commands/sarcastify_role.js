
const utils = require('../util');

//Description:  Changes all messages of given role into "SarCAsTiC"
//              text
//Parameters:   A string
module.exports = {
    name        : "sarcastify-role",
    description : "All messages of given user into \"SarCAsTiC\" text",
    permissions : ["MANAGE_MESSAGES"],
    execute(msg, args){
        if(!args.length || !msg.mentions.roles){
            return false;
        }

        var applied_role = msg.mentions.roles.first().id;

        utils.sarcastifyRole(applied_role);
    }
}