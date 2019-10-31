var crypto = require('crypto');
var aes256 = require('aes256');
var key = 'password';
var algorithm = 'aes-128-cbc';
var password = 'd6F3Efeq';
module.exports = {
    
    pass_validation:function(user_detail ,match_data){   
        if(user_detail === match_data){
            return true;
        }
        else{
            return false;
        }
    },

    encrypt:function(password){
        return aes256.encrypt(key, password);
    },

    decrypt:function(password){
        return aes256.decrypt(key, password);
    },

    encryption:function(pass){
        var cipher = crypto.createCipher(algorithm,password);
        var crypted = cipher.update(pass,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decryption:function(pass){
        var decipher = crypto.createDecipher(algorithm,password);
        var dec = decipher.update(pass,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }

};