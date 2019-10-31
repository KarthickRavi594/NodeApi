var mongoose = require('mongoose');
        var signup = new mongoose.Schema({
            userName : String,
            password : String,
            confirm_Password : String,
            email : String
        });
module.exports = mongoose.model('SignUp',signup);

