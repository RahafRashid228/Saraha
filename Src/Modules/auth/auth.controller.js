import UserModel from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken'
import {sendEmail} from '../../utils/sendEmail.js';
//import { registerSchema } from "./auth.validation.js";

export const register =async(req,res)=>{
   
   const {userName,email,password}=req.body;
 
   const user =await UserModel.findOne({email});
   if(user){
    return res.status(409).json({message:"email already exists"});
   }
   const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const html=`
    <div>
    <p> Dear:${userName} </p>
    <h1 style='background-color:teal;width:50%>welcome </h1>
    <h2> new Account</h2>
    <p> welcome to saraha </p>
    </div>
    `
   sendEmail(email,"welcome",html);
    await UserModel.create({userName,email,password: hashedPassword})
   
   
    return res.status(201).json({ message:"user created successfully"});}
    

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

export const allusers= async(req,res)=>{
    
    const users=await UserModel .find().select('UserName');
    return res.status(200).json({message:'success',users});
 }
