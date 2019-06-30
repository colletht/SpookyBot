
const utils = require('../util');

//Description:  Transforms entire string following the command into "SarCAsTiC"
//              text
//Parameters:   A string
module.exports = {
    name        : "s",
    description : "Transforms entire string following the command into \"SarCAsTiC\" text",
    execute(msg, args){
        if(!args){
            return false;
        }
        //delete calling message
        msg.delete(50);

        var out_str = '';

        for(var token of args){
            out_str += utils.sarcastify(token) + ' ';
        }

        msg.channel.send(out_str);
    }
}