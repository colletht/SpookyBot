require('dotenv').config();

//Description:  Magic 8 ball like command that gives an answer to a yes or no question
//Parameters:   A string
module.exports = {
    name        : "magic-conch",
    description : "Ask the magic conch a yes or no question, must start with 'Do' or 'Should'",
    usage       : `${process.env.PREFIX}magic-conch <question>`,
    permissions : [],
    cooldown    : 2,
    execute(msg, args){
        if(!args){
            return false;
        }

        if(!(args[0].toLowerCase() === 'do' || args[0].toLowerCase() === 'should')){
            return false;
        }

        const responses = ['yes', 'no', 'maybe' , 'possibly', 'I don\'t know', ' ']

        var response = responses[Math.floor((Math.random()*responses.length))];

        msg.channel.send(`The magic conch says... ${response}`);
    }
}