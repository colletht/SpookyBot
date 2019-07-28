fs = require('file-system');

//maps a regex a route to the sounds file path
var soundboardmap = {
    '1'  : "./mp3_files/ree-sb.mp3",
    'ree': "./mp3_files/ree-sb.mp3",
    '2'  : "./mp3_files/not-easy.mp3",
    'not-easy': "./mp3_files/not-easy.mp3",
    '3' : './mp3_files/hey-boss.mp3',
    'hey-boss': './mp3_files/hey-boss.mp3',
    '4': './mp3_files/mayo.mp3',
    'mayo': './mp3_files/mayo.mp3',
    '5': './mp3_files/airhorn.mp3',
    'airhorn' : './mp3_files/airhorn.mp3',
    '6' : './mp3_files/thx.mp3',
    'thx' : './mp3_files/thx.mp3',
    '7' : './mp3_files/windows-xp.mp3',
    'xp' : './mp3_files/windows-xp.mp3'
}

module.exports = {
    name        : 'sb',
    description : 'depending on the argument, produces a different sound in the voice channel the caller is currently in',
    usage       : '!sb <number or name>',
    permissions : [],
    cooldown    : 2,
    async execute(msg, args){
        if(!args.length){
            console.log('Command Failure: Invalid arguments');
            return false;
        }
        if(!msg.guild){
            console.log('Command Failure: Must be called from a guild');
            return false;
        }
        if(!msg.member.voice.channel){
            console.log('Command Failure: Must be in a voice channel');
            msg.author.send('You must be in a voice channel to use this command');
            return false;
        }

        if(soundboardmap[args[0].toLowerCase()] && msg.member.voice.channel){
            const sound = soundboardmap[args[0].toLowerCase()];
            const connection = await msg.member.voice.channel.join()
            const dispatcher = connection.play(sound , { volume : 1});
            
            dispatcher.on('error', e => console.log(e));

            //taken from discord tut
            dispatcher.on('debug', e => {
                // Catch any errors that may arise
                console.log(e);
            });

            dispatcher.on('end', () => {
                console.log('Succesfully played sound');
                connection.disconnect();
            });
        }else{
            console.log('Invalid argument specified');
            msg.author.send('That is not a recognized sound');
        }
    }
}