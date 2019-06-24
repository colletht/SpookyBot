//utility class for parsing and performing operations on the output returned from the steam api

const async = require('async');

    //takes as argument a JSON game list from steam api and returns a string of games and playtime
exports.stringGames = gameListJSON => {
    var outputString = ""

    for(var i = 0; i < gameListJSON.length; ++i){
        outputString += `${gameListJSON[i].name}\n`;
    }

    return outputString;
}



var intersectHelper = (list1, list2) => { 
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
exports.intersectGames = gamesListJSON => {
    outputGameList = [];

    return gamesListJSON.reduce(intersectHelper);
}