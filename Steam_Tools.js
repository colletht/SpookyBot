//utility class for parsing and performing operations on the output returned from the steam api

require('dotenv').config();

const async = require('async');

const steamAPI = require('steamapi');
const steam = new steamAPI(process.env.STEAM_API_KEY);

    //takes as argument a JSON game list from steam api and returns a string of games and playtime
exports.stringGames = function(gameListJSON) {
    var outputString = ""

    //only prints max of 2000 Games
    for(var i = 0; i < gameListJSON.length; ++i){
        if(1970 < outputString.length + gameListJSON[i].name.length){
            outputString += '---Message limit reached---'
            break;
        }
        outputString += `${gameListJSON[i].name}\n`;
    }

    return outputString;
}

var intersectHelper = function(list1, list2) { 
    outputGameList = [];

    return list1.filter(function(game) {
        for(var i = 0; i < this.length; ++i){
            if(game.name === this[i].name){
                return true;
            }
        }
        return false;
    },
    list2);
}

//gets the intersection of the list of games lists provided to the function
exports.intersectGames = function(gamesListJSON) {
    outputGameList = [];

    return gamesListJSON.reduce(intersectHelper);
}

//checks if given string represents a valid link to a user in steam
//aka: can steam resolve it
//if it can it calls callback(true) else callback(false)
exports.verifyUsername = function(username, callback) {
    steam.resolve(`https://steamcommunity.com/id/${username}`).then(function(result){
        callback(true);
    }).catch(function(err){
        console.log('Error: verifyUsername ' + err);
        callback(false);
    })
}