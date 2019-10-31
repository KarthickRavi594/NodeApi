var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require("body-parser");
var util = require('./util');
var app = express();
var sign = require('./Module/util/schema/schema');
var query = require('./Module/util/general_util/generalUtil');
var sign = require('./Module/util/schema/schema');
var signup = require('./Module/util/general_util/signup');
const port = process.env.PORT || 3456;
app.listen(port,err =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Running in ",port);
    }
});
app.use(bodyParser.json());
const mongodb = 'mongodb://Karthick:Karthick1@ds137596.mlab.com:37596/testsample';
mongoose.connect(mongodb, function (err, db) {
    if (!err) {
        console.log('Connected to DB');
    }
    else {
        console.log(' Failed to  Connect');
    }
});

app.post('/signup', async function (req, res) {
    let signUpData = await query.signUp(req.body)
    if (!signUpData) {
            var signin = signup.register(req.body);
            if (util.pass_validation(req.body.password, req.body.confirm_Password)) {
                signin.save(function (err) {
                    if (!err) {
                        res.send("{'Message':'Signup Successful. Please do login'}");
                    }
                    else {
                        res.send("{'Message':'SignUp Detail not updated'}");
                    }
                });
            } else {
                res.send("{'Message':'Password Mismatch'}");
            }
    }
    else{
        res.send("{'Message':'User Already exists'}");
    }
});

app.post('/login', async function (req, res) {
    let signUpData = await query.signUp(req.body);
    if(signUpData){
        if (util.pass_validation(req.body.userName, signUpData.userName)) {
            var pass = util.decryption(signUpData.password);
            console.log('Decrypted value', pass);
            // if(util.pass_validation(req.body.password,util.decrypt(userData.password))){
            if (util.pass_validation(req.body.password, pass)) {
                console.log("Logged in successfully");
                res.send('Logged in successfully');
            }
            else {
                res.send('Password not match');
            }
        }
    }
    else{
        res.send("{'Message':'UserName Not exists'}");
    }
});

app.post('/edit', async function (req, res) {
    let signUpData = await query.signUp(req.body);
    if(signUpData){
        signUpData.password = util.encryption(req.body.password);
        signUpData.confirm_Password = req.body.confirm_Password;
        signUpData.email = req.body.email;
        if (util.pass_validation(req.body.password, req.body.confirm_Password)) {
            signUpData.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'User data Updated' });
                }
            });
        }
        else {
            res.send('Password not match');
        }
    }
    else{
        res.send("{'Message':'UserName Not exists'}");
    }
});

app.post('/delete', async function (req, res) {
    let signUpData = await query.remove(req.body);
    if(signUpData){
        res.send("Deleted");
    }
    else{
        res.send("{'Message':'UserName Not exists'}");
    }
})