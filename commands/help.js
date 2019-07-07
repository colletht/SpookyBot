require('dotenv').config();
const MAX_CMD_LEN = 20;

module.exports = {
    name        : 'help',
    description : 'provides list of commands or help with specific commands',
    usage       : `${process.env.PREFIX}help\n${process.env.PREFIX}help <command name>`,
    permissions : [],
    cooldown    : 2,
    execute(msg, args){
        var data = [];
        const { commands } = msg.client;

        if(!args.length){
            //case generic help command was called
            data.push('Here is a list of my commands: ');

            data.push(commands.map(cmd => `**${cmd.name}:** ${cmd.description}`).join('\n'));
            data.push(`If you want info about just one command type ${process.env.PREFIX}help <command name>`);

            msg.author.send(data, {split : true});
        }else{
            const cmd = commands.get(args[0]);
            if(cmd){
                data.push(`**Command:    ** ${cmd.name}`);
                data.push(`**Description:** ${cmd.description}`);
                data.push(`**Usage:      ** ${cmd.usage}`);
                data.push(`**Cooldown:   ** ${cmd.cooldown}`);

                msg.author.send(data, {split : true});
            }
        }
    }
}