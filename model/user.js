const mongoose = require('mongoose');
const User = mongoose.model('User',
    {
        fullname: {
            type: String   
        },
        gender: { 
            type: String  
        },
        phone: {  
            type: String  
        },
        email: {  
            type: String
        },
        address: {  
            type: String
        },
        username: {  
            type: String
        },
        password: {  
            type: String
        },
        usertype: {  
            type: String
        },
        profilepic:{
            type: String
        }
    });
    module.exports = User;  