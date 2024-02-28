const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    fullname:{
        type:String,
    },
    ispid:{
        type:Number
    }
    ,
    password:{type:String, required:true},
    mbps:{type:Number},
    location:{
        type:String
    },
    transaction:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transaction'
    }],

    userType:{
        type:String,
        enum:["independent", "super", "admin"],
        
    }
    , userStatus:{
        type:String,
        enum:["active", "suspend"],
        default:'active'
    }
    


})



const userModel = mongoose.model("User", userSchema)



module.exports = userModel;