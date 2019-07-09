const mongoose = require('mongoose');

const hireschema=new mongoose.Schema({

    mechanicid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',    
        required: true
    },
    hiredetail:{
        type:String
    },
    Userid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',    
        required: true
    }
   
});


const hire = mongoose.model('Hire', hireschema);
module.exports = hire;

