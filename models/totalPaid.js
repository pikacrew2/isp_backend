const mongoose = require('mongoose');

const paid = new mongoose.Schema({
    month:{
        type:Number,
        required:true,
    },
    lifetime:{
        type:Number,
        reuired:true,
    },
   
})

const totalPaidModel = mongoose.model("PaidByUser", paid);



module.exports = totalPaidModel;