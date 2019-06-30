//Description:  When "Im" is entered anywhere in the channel
//              Bot will respond with "hi <rest of string>
//              im dad!"
//Parameters:   msg, args
module.exports = {
    name        : 'Dad Joke',
    description : 'Listens for dad jokable moments',
    permissions : [],
    execute(msg, args) {
        var ret_string = args.pop().trim();

        if(ret_string){
            msg.reply(`Hi **${ret_string}** \nI'm Dad!`);
        }
    }
}