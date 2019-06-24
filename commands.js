//Definition of all command functions associated with the message event
//define any exports here with the syntax
//
//      exports.<function name> = <definition>
//

//for neater handling of nested callbacks
const async = require('async');

//for access to our steam key
require('dotenv').config();

//include steamapi for steam commands
const steamAPI = require('steamapi');
const steam = new steamAPI(process.env.STEAM_API_KEY);

const steamtools = require('./Steam_Tools');

//Definition: command for getting users' shared game from steam
//Parameters: Bot - reference to the main Bot object
//            args - the remaining string from the command call i.e. excluding !shared-games
//                   should include only names of users
exports.sharedGames = (Bot, msg, args) => {
    //transform remaining args into array of arguments
    args = args.trim().split(" ");

    console.log(args);

    //call the steam api and get the results to the server output
    async.waterfall([
        //get user id based off nickname
        function(callback){
            Promise.all(args.map(function(arg) {
                return steam.resolve('https://steamcommunity.com/id/' + arg).then(function(result){
                    return result;
                })
            })).then(function(result) {
                console.log('Succesfully retrieved user ids');
                callback(null, result);    
            })               
        },

        //get list of list of users owned games
        function(ids, callback){
            Promise.all(ids.map(function(id){
                return steam.getUserOwnedGames(id).then(function(result){
                    return result;
                })
            })).then(function(result){
                console.log('Succesfully retrieved user games');
                callback(null, result);
            })
        }
    ], 
    function(err, result){
        if(err){
            msg.reply(err);
            console.log(err);
        }else{
            //print to server here
            console.log(result.length);
            msg.reply(steamtools.stringGames(steamtools.intersectGames(result)));
            console.log('done');
        }
    })   
}

//Definition: command for getting user's game list from steam'
//Parameters: Bot - reference to the main Bot object
//            args - the remaining string from the command call i.e. excluding !shared-games
//                   should include a single username
exports.listGames = (Bot, msg, args) => {
    args = args.trim();

    console.log(args);

    //call the steam api and get the results to the server output
    async.waterfall([
        function(callback){
            steam.resolve(`https://steamcommunity.com/id/${args}`).then(id => {
                console.log(id)
                callback(null, id);
            })
        },

        function(userID, callback){
            steam.getUserOwnedGames(userID).then(games => {
                console.log(games)
                callback(null, games)
            })
        }
    ], 
    function(err, result){
        if(err){
            msg.reply(err);
            console.log(err);
        }else{
            //print to server here
            msg.reply(`${steamtools.stringGames(result)}`);
            console.log('done');
        }
    })   
}