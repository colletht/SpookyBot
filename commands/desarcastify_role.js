
const utils = require('../util');

//Description:  removes sarcastification of role
//Parameters:   A string
module.exports = {
    name        : "desarcastify-role",
    description : "All messages of given user into \"SarCAsTiC\" text",
    permissions : [],
    execute(msg, args){
        if(!args.length || !msg.mentions.roles){
            return false;
        }

        var applied_role = msg.mentions.roles.first().id;

        utils.deSarcastifyRole(applied_role);
    }
}