const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true,
    },
    transId:{
        type:String,
        reuired:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        , required:true,
    }, 
    super:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:["approved", "pending", "rejected"],
        default:'pending'
    }
})

const TransModel = mongoose.model("Transaction", transactionSchema);



module.exports = TransModel;