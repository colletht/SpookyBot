//Definition of all command functions associated with the message event
//define any exports here with the syntax
//
//      exports.<function name> = <definition>
//

//for neater handling of nested callbacks
const async = require('async');
const utils = require('./util');

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
exports.sharedGames = function(Bot, msg, args) {
    //transform remaining args into array of arguments
    args = args.trim().split(" ");

    //TODO: error check args before processing
    //convert tags using new apis

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
            msg.channel.send(err);
            console.log(err);
        }else{
            //print to server here
            console.log(result.length);
            msg.channel.send(steamtools.stringGames(steamtools.intersectGames(result)));
            console.log('done');
        }
    })   
}

//Definition: command for getting user's game list from steam'
//Parameters: Bot - reference to the main Bot object
//            args - the remaining string from the command call i.e. excluding !shared-games
//                   should include a single username
exports.listGames = function(Bot, msg, args) {
    args = args.trim();

    
    //TODO: error check args before processing
    //convert tags using new apis

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
            msg.channel.send(err);
            console.log(err);
        }else{
            //print to server here
            msg.channel.send(`${steamtools.stringGames(result)}`);
            console.log('done');
        }
    })   
}

//Definition: command for linking a user tag to a username from steam
//Parameters: Bot - reference to the main Bot object
//            msg - reference to the msg that called the command
//            args - the remaining string after the call i.e. excluding
//                   !link-steam, can include a single steam username, or
//                   a tagged user followed by a username
exports.linkSteam = function(Bot, msg, args) {
    args = args.trim().split(' ');
    var user_to_link;   //discord user to link steam account to
    var linked_account; //steam account username
    if(args.length === 1){
        //case we want to link account to the msg senders account
        console.log('DEBUG OUTPUT: USER RETRIEVED FROM CALL TO LINK STEAM' + msg.author.tag);
        user_to_link = msg.author.tag;
        linked_account = args[0];
    }else if(args.length === 2 && args.mentions.users.length !== 0){
        //case we are linking accounts other than our own
        console.log('DEBUG OUTPUT: USERS TAGGED IN CALL TO LINK STEAM: ' + msg.mentions.users);
        user_to_link = msg.mentions.users[0].tag;
        linked_account = args[1];
    }else{
        //invalid args
        return false;
    }

    steamtools.verifyUsername(linked_account, function(valid){
        if(valid){
            utils.addSteamAccountLink(user_to_link, linked_account);
            console.log('Linking success!');
            msg.channel.send(`Linked ${user_to_link} to steam account ${linked_account}`);
        }else{
            console.log("Invalid username");
            msg.channel.send('Steam username does not exist');
        }
    })


}

//Definition: Removes a previously linked tag:steam account pair from the database
//            If the tag is not in the database nothing is changed
//Parameters: Bot - reference to the main Bot object
//            msg - reference to the msg that called the command
//            args - the remaining string after the call i.e. excluding
//                   !remove-link-steam, can include a tag, or no argument
//                   in which case the author of the messages's tag is used
exports.removeLinkSteam = function(Bot, msg, args) {
    args = args.trim().split(' ');
    var user_to_unlink;

    if(args.length == 0){
        user_to_unlink = msg.author.tag;
    }else if(args.length == 1 && msg.mentions.users.length !== 0){
        user_to_unlink = msg.mentions.users[0].tag;
    }else{
        return false;
    }

    utils.rmSteamAccountLink(user_to_unlink);
}