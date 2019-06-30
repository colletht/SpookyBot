//misc utility functions for app

var DEFAULT_UTIL_JSON = {steam_links: { }};

const fs = require('file-system');

if(!fs.existsSync('./server_data/util_data.json')){
    fs.writeFileSync('./server_data/util_data.json', JSON.stringify(DEFAULT_UTIL_JSON, null, 2));
}

//note steam username should be verified prior to adding
exports.addSteamAccountLink = function (username, steamUsername){
    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));
    
    cur_util_json.steam_links[username] = steamUsername;

    fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
}

exports.rmSteamAccountLink = function(username){
    var cur_util_json = DEFAULT_UTIL_JSON;

    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));

    if(cur_util_json.steam_links.hasOwnProperty(username)){
        delete cur_util_json.steam_links[username];
        cur_util_json = fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
    
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

exports.sarcastifyMessage = function(string, style = undefined){
    var out_string = exports.sarcastify(string);
    if(style === 'i')
        out_string = `*${out_string}*`
    else if(style == 'b')
        out_string = `**${out_string}**`
    else if(style == 'u')
        out_string = `__${out_string}__`
    return out_string;
}

exports.sarcastify = function(string){
    var new_str = '';
    for(var i in string){
        if(Math.round(Math.random()) === 1){
            new_str += string.charAt(i).toUpperCase();
        }else{
            new_str += string.charAt(i).toLowerCase();
        }
    }
    return new_str;
}

exports.sarcastifyRole = function(rolename){
    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));
    
    cur_util_json.sarcastified.push(rolename);

    fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
}

exports.isSarcastified = function(rolenames){
    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));
    
    return cur_util_json.sarcastified.filter(role => rolenames.has(role)).length > 0;
}

exports.deSarcastifyRole = function(rolename){
    cur_util_json = JSON.parse(fs.readFileSync('./server_data/util_data.json'));

    if(cur_util_json.sarcastified.includes(rolename))
        cur_util_json.sarcastified.splice(cur_util_json.sarcastified.indexOf(rolename), 1);

    fs.writeFileSync('./server_data/util_data.json', JSON.stringify(cur_util_json, null, 2));
}

exports.checkPermissions = function(req_perms, perm_check_function){
    for(const perm of req_perms){
        if(!perm_check_function.hasPermission(perm)){
            return false;
        }
    }
    return true;
}