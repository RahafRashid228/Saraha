import UserModel from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken'

export const register =async(req,res)=>{
   try{
   const {userName,email,password}=req.body;
   const user =await UserModel.findOne({email});
   if(user){
    return res.status(409).json({message:"email already exists"});
   }
   const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
  
    await UserModel.create({userName,email,password: hashedPassword})
   
   
    return res.status(201).json({ message:"user created successfully"});}
    catch(err){
        return res.status(500).json({ message:"catch error",error:err.stack});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});

    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const match = bcrypt.compareSync(password,user.password)
    if(!match){
        return res.status(404).json({message:"invalid data"});
    }


    const token= await jwt.sign({id:user._id},process.env.LOGINSIGNITURE,{expiresIn:'20h'});



    return res.status(200).json({message:"success",token});
}