const TransModel = require('../models/transactionModel.js');
const userModel = require("../models/user.model.js");
const totalPaidModel = require('../models/totalPaid.js');

const transactionController  = async (req, res)=>{
    try{
     const {amount, transId, user} = req.body;

    const tr = await TransModel.findOne({transId})
    if(tr){
    return res.status(401).json({message:'this transaction id already submitted'})
    }
  
        const trans = new TransModel({amount, transId, user});
        await trans.save();
  
    return  res.status(200).json({message:'requested successfully! please wait for approve'})
    }catch(error){
     return   res.status(500).json({message:error})
    }
} 

const requestBySuper  = async (req, res)=>{
    try{
     const {amount, transId, user} = req.body;
    const tr = await TransModel.findOne({transId})
    if(tr){
    return res.status(401).json({message:'this transaction id already submitted'})
    }
        const trans = new TransModel({amount, transId, user});
        await trans.save();
 
    return  res.status(200).json({message:'requested successfully! please wait for approve'})
    }catch(error){
     return   res.status(500).json({message:error})
    }
} 








const transApproved = async (req, res) => {

  try {
    const { trx } = req.body;


    const findUser = await userModel.findOne({ userType: 'admin' });
    const findTrans = await TransModel.findOne({ _id: trx });
    const tl = await totalPaidModel.findOne();
    

    if (findUser && findUser.userType === 'admin') {

      if (findTrans) {
            if(findTrans.status == 'approved'){
                return res.status(401).json({message:'you already approved this transaction'})
            }else if(findTrans.status == "rejected"){
                return res.status(401).json({message:'you already rejected this transaction'})
            }
        findTrans.status = 'approved';
    
       if(tl){
        tl.month += findTrans.amount;
        tl.lifetime += findTrans.amount;
        await tl.save();
       }
       await  findTrans.save();


        return res.status(200).json({ message: 'this transaction has been approved ' });

      } else {

        return res.status(401).json({ message: 'transaction is not valid' });

      }

    } else {

      return res.status(401).json({ message: 'you are not an admin this function only admin can execute' });

    }

  } catch (error) {

    return res.status(500).json({ message: error });

  }

};
const transCancelled = async(req, res)=>{
    try{
        const {trx} = req.body;

        const findUser = await userModel.findOne({userType:'admin'});
        const findTrans = await TransModel.findOne({_id:trx});
        if(findTrans.status == 'approved'){
            return res.status(401).json({message:'you already approved'})
        }else if(findTrans.status == "rejected"){
            return res.status(401).json({message:'you already Rejected'})

        }
         if(findUser.userType == 'admin'){
                findTrans.status = 'rejected'
               await findTrans.save();
               return res.status(200).json({message:'this transaction has been Rejected'});
         }else{
          return  res.status(401).json({message:"you're not an admin this function only admin can exicute"})
         }

    }catch(error){
      return  res.status(500).json({message:error})
    }
}
const transByUser = async(req, res)=>{
    try{
        const user = req.params.id;
        const trans = await TransModel.find({user:user})
       
            return res.status(200).json({message:trans})
        
    }catch(error){
      return res.status(500).json({message:'something went wrong'})
    }
}
const trans = async(req, res)=>{
    try{
        const data = await TransModel.find();
     return res.status(200).json({message:data})
    }catch(error){
      return  res.status(500).json({message:'something went wrong'})
    }
}
const transAndApprove = async(req, res, )=>{
    try{
        const transId = req.params.transId
        const trx = await TransModel.findOne({transId})
        if(trx){
             if(trx.super){
               const superUser = await userModel.findOne({_id:trx.user});
                const user = await userModel.findOne({_id:trx.user});
                return res.status(200).json({message:"transaction founded", trans:trx, user:user, superUser:superUser})
             }else{
                const us = await userModel.findOne({_id:trx.user});
                return res.status(200).json({message:'transaction founded',trans:trx, user:us})
             }
          
             
        }else{
        return res.status(404).json({message:'transaction not found'})
        }

    }catch(error){
        return res.status(500).json({message:'something wnet wrong'})
    }
}
const lifetimePaid = async (req, res)=>{
    try{
        const totalPaid = await totalPaidModel.findOne();
        res.status(200).json({message:'success', lifetime:totalPaid.lifetime})
    }catch(error){
        res.status(500).json({message:'something went wrong'})
    }
}
const single_month_paid = async (req, res)=>{
    try{
        const singleMonthPaid = await totalPaidModel.findOne();
        res.status(200).json({message:'success', month:singleMonthPaid.month})
    }catch(error){
        res.status(500).json({message:'something went wrong'})
    }
}

const reset = async(req, res)=>{
    try{
        const paid = await totalPaidModel.findOne();
        paid.month = 0;

        await paid.save();

        return res.status(200).json({message:'you have reset monthly payment hostory'})

    }catch(error){
        return res.status(500).json({message:'something went worng'})
    }
}

const test = async(req, res)=>{

try{
    const {month, lifetime} = req.body
    const a = new totalPaidModel({month, lifetime})
     if(a){
        res.status(200).json({message:'done'})
     }
}catch(error){
    res.status(500).json({message:'error'})
}
}
module.exports = {requestBySuper, transAndApprove,test,reset, transactionController,transByUser,trans,  transApproved, transCancelled, lifetimePaid, single_month_paid}

