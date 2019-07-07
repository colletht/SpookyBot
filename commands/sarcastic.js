require('dotenv').config();
const utils = require('../util');

//Description:  Transforms entire string following the command into "SarCAsTiC"
//              text
//Parameters:   A string
module.exports = {
    name        : "s",
    description : "Transforms entire string following the command into \"SarCAsTiC\" text",
    usage       : `${process.env.PREFIX}s <message>`,
    permissions : ["MANAGE_MESSAGES"],
    cooldown    : 2,
    execute(msg, args){
        if(!args){
            return false;
        }
        //delete calling message
        msg.delete(20);

        var out_str = '';

        for(var token of args){
            out_str += `*${utils.sarcastify(token)}* `;
        }

        msg.channel.send(out_str);
    }
}