const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const userController = async (req, res)=>{
    try{
    const {username, password, fullname, phone, mbps, ispid, location, userType} = req.body;

    const checkUser = await userModel.findOne({$or:[{username},{ispid}]})
    if(checkUser){
       return res.status(401).json({message:'username or ispId already exist'});
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const insertUser = new userModel({username, userType, password:hashedPass, phone, ispid, fullname, phone, mbps, location})
    await insertUser.save();
  return  res.status(200).json({message:'user Created Successfully!'});


    }catch(error){
      return  res.status(500).json({message:"something went wrong"})
      console.log(error)
    }
}

const login = async (req, res)=>{

    try{
       const {username, password} = req.body;
       const User = await userModel.findOne({username});
       if(!User){
       return res.status(401).json({message:'username invalid please enter valid username'});
       }

       const checkPass = await bcrypt.compare(password, User.password);
       if(!checkPass){
      return  res.status(401).json({message:'password incorrect please enter correct password'});
       }
      
       const token = jwt.sign(
        {
           userId:User._id,
           username:User.username,
           fullname:User.fullname,
           mbps:User.mbps,
           phone:User.phone,
           location:User.location,
           ispid:User.ispid,
           userType:User.userType,
        },
        process.env.JWT,
        {expiresIn:'1y'}
       );

      return res.status(200).json({token})

    }catch(error){

        res.status(500).json({message:'something went wrong'})
    }
}

const loggedData = async(req, res)=>{
    try{
        const token = req.header("Authorization").split(' ')[1];
    
        if(!token) return null;
            
        const decode = jwt.verify(token, process.env.JWT)
        const user = {
            userId:decode.userId,
            username:decode.username,
            fullname:decode.fullname,
            mbps:decode.mbps,
            phone:decode.phone,
            location:decode.location,
            ispid:decode.ispid,
            userType:decode.userType
         }
       return res.status(200).json(user);

    }catch(error){
  return   res.status(500).json({message:error})

    }
}

const getUsers = async (req, res)=>{
  try{
     const user = await userModel.find();
     return res.status(200).json({message:user});
  }catch(error){
   return res.status(500).json({message:error})
  }
}

const getUserByUsername=async(req, res)=>{
  try{
    const username = req.params.username;
    const user = await userModel.findOne({username});
   if(user){
    return res.status(200).json({message:user})
   }else{
    res.status(401).json({message:'user not found'})
   }
  }catch(error){
    return res.status(500).json({message:error})
  }
}

const deleteUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id)
    return res.status(200).json({message:"you've successfully deleted this user"})
  }catch(error){
   return res.status(500).json({message:'something went wrong'})
  }
}


module.exports = {userController, deleteUser, login, loggedData, getUsers, getUserByUsername}