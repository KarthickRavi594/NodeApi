var mongoose = require('mongoose');
var sign = require('../schema/schema');
var util = require('../../../util');

module.exports = {

    signUp: async function (userDetail) {
        console.log(userDetail);
        return sign.findOne({ userName: userDetail.userName }, function (err, data) {
            if (!err) {
            }
            else {
            }
        });
    },

    remove: async function (userDetail) {
        return sign.remove({ userName: userDetail.userName }, function (err, data) {
            if (!err) {

            }
            else {

            }
        });
    }

}