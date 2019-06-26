//misc utility functions for app

var DEFAULT_UTIL_JSON = {steam_links: { }};

const fs = require('file-system');

//note steam username should be verified prior to adding
exports.addSteamAccountLink = function (username, steamUsername){
    var cur_util_json = DEFAULT_UTIL_JSON;
    //check if the file exists, if it does read from it
    if(fs.statSync('./server_data/util_data.json').isFile()){
        cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));
    }

    cur_util_json.steam_links[username] = steamUsername;

    fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
}

exports.rmSteamAccountLink = function(username){
    var cur_util_json = DEFAULT_UTIL_JSON;

    //check if the file exists,
    if(fs.statSync('./server_data/util_data.json').isFile()){
        cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));

        if(cur_util_json.steam_links.hasOwnProperty(username)){
            delete cur_util_json.steam_links[username];
            cur_util_json = fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
        }
    }
    return true;
}

exports.getSteamAccountFromUsername = function(username){
    var cur_util_json = DEFAULT_UTIL_JSON;

    if(!fs.statSync('./server_data/util_data.json').isFile()){
        return null;
    }
    
    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));

    if(cur_util_json.steam_links.hasOwnProperty(username)){
        return cur_util_json.steam_links[username];
    }else{
        return null;
    }    
}