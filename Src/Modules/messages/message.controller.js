import jwt from'jsonwebtoken';
import UserModel from "../../../DB/models/User.model.js";
import messageModel from "../../../DB/models/Message.model.js";
export const sendMessage= async(req,res)=>{
    try{const {message}=req.body;
    const {receiverId}=req.params;

    const user= await UserModel.findById(receiverId);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
     await messageModel.create({message, receiverId});
     return res.status(201).json({message:"success"});}
     catch(error){
        return res.status(500).json({message:"catch error",error:error.stack});}
     }
    
     export const getMessage= async(req,res)=>{
        
            const {token}= req.body;
        const decoded =jwt.verify(token,process.env.LOGINSIGNITURE);
        if(!decoded){
            return res.ststus(400).json({message:"invalid token"});
        }
        const id=decoded.id;
        const messages= await messageModel.find({receiverId:req.id});
        return res.status(200).json({message:"success",messages});
        }
        
     
     