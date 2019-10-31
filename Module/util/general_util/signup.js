var sign = require('../schema/schema');
var util = require('../../../util');

module.exports = {
    register:function(userDetail){
        var register = new sign({
            userName: userDetail.userName,
            password: util.encryption(userDetail.password),
            confirm_Password: userDetail.confirm_Password,
            email: userDetail.email
        });        
        return register;
    }

    
}
