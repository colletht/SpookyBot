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
    'xp' : './mp3_files/windows-xp.mp3',
    '8' : './mp3_files/oof.mp3',
    'oof' : './mp3_files/oof.mp3',
    '9' : './mp3_files/vsauce.mp3',
    'vsauce' : './mp3_files/vsauce.mp3',
    '10' : './mp3_files/screams.mp3',
    'screams' : './mp3_files/screams.mp3',
    '11' : './mp3_files/depression.mp3',
    'depression' : './mp3_files/depression.mp3',
    '12' : './mp3_files/sure-about-that.mp3',
    'sure-about-that' : './mp3_files/sure-about-that.mp3',
    '13' : './mp3_files/you-what.mp3',
    'you-what' : './mp3_files/you-what.mp3',
    '14' : './mp3_files/best-sex.mp3',
    'best-sex' : './mp3_files/best-sex.mp3',
    '15' : './mp3_files/take-hat.mp3',
    'take-hat' : './mp3_files/take-hat.mp3',
    '16' : './mp3_files/what-kind-of-place.mp3',
    'what-kind-of-place' : './mp3_files/what-kind-of-place.mp3',
    '17' : './mp3_files/moan.mp3',
    'moan' : './mp3_files/moan.mp3'
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