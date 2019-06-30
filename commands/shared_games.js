
//for neater handling of nested callbacks
const async = require('async');

const utils = require('../util');

//for access to our steam key
require('dotenv').config();

//include steamapi for steam commands
const steamAPI = require('steamapi');
const steam = new steamAPI(process.env.STEAM_API_KEY);

const steamtools = require('../Steam_Tools');


//Definition: command for getting users' shared game from steam
//Parameters: Bot - reference to the main Bot object
//            args - the remaining string from the command call i.e. excluding !shared-games
//                   should include only names of users
module.exports = {
    name        : 'shared-games',
    description : 'display the games any number of linked users have in common on steam',
    execute(msg, args) {
        console.log(args);
        if(!args.length){
            //invalid args
            return false;
        }

        args = args.filter(arg => arg.match(/<@>/));

        //convert args to all steam accounts
        args = args.concat(msg.mentions.users.map(arg => {
            console.log(arg.tag);
            var user = utils.getSteamAccountFromUsername(arg.tag);
            if(user){
                return user;
            }
            return null;
        }).filter(res => res !== null));

        console.log('----> ' + args);

        //call the steam api and get the results to the server output
        async.waterfall([
            //get user id based off nickname
            function(callback){
                Promise.all(args.map(function(arg) {
                    return steam.resolve('https://steamcommunity.com/id/' + arg).then(function(result){
                        return result;
                    }).catch(err => callback(err, null))
                })).then(function(result) {
                    callback(null, result);    
                }).catch(err => callback(err, null));           
            },

            //get list of list of users owned games
            function(ids, callback){
                Promise.all(ids.map(function(id){
                    return steam.getUserOwnedGames(id).then(function(result){
                        return result;
                    }).catch(err => callback(err, null));
                })).then(function(result){
                    console.log('Succesfully retrieved user games');
                    callback(null, result);
                }).catch(err => callback(err, null));
            }
        ], 
        function(err, result){
            if(err){
                console.log(err);
            }else{
                //print to server here
                msg.channel.send(steamtools.stringGames(steamtools.intersectGames(result)));
                console.log('done');
            }
        })   
    }
}