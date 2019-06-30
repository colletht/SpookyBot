//for neater handling of nested callbacks
const async = require('async');

const utils = require('../util');

//for access to our steam key
require('dotenv').config();

//include steamapi for steam commands
const steamAPI = require('steamapi');
const steam = new steamAPI(process.env.STEAM_API_KEY);

const steamtools = require('../Steam_Tools');



//Definition: command for getting user's game list from steam'
//Parameters: Bot - reference to the main Bot object
//            args - the remaining string from the command call i.e. excluding !shared-games
//                   should include a single username
module.exports = {
    name        : 'list-games',
    description : 'display a linked users games list on steam',
    execute(msg, args) {
        if(!args.length){
            //case use authors tag
            var user = utils.getSteamAccountFromUsername(msg.author.tag);
            if(!user) return false;
        }else if(args.length === 1){
            //case use argument provided
            var user = utils.getSteamAccountFromUsername(msg.mentions.users.first().tag);
            console.log(msg.mentions.users.first().tag + ' ' + user);
            if(!user) user = args[0];
        }else{
            //invalid args
            return false;
        }

        //call the steam api and get the results to the server output
        async.waterfall([
            function(callback){
                steam.resolve(`https://steamcommunity.com/id/${user}`).then(id => {
                    callback(null, id);
                }).catch(err => callback(err, null));
            },

            function(userID, callback){
                steam.getUserOwnedGames(userID).then(games => {
                    callback(null, games);
                }).catch(err => callback(err, null));
            }
        ], 
        function(err, result){
            if(err){
                console.log(err);
            }else{
                //print to server here
                msg.channel.send(`${steamtools.stringGames(result)}`);
                console.log('!list-games executed succesfully');
            }
        })
    }
}