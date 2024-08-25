import jwt from 'jsonwebtoken';
export const auth =(req,res,next)=>{
    try{
    const {authorization}= req.headers;
    if(!authorization.startswith('Rahaf__')){
        return res.status(400).json({message:"invalid token"});
    }
    const token= authorization.split(process.env.BERERTOKEN)[1];
    const decoded =jwt.verify(token,process.env.LOGINSIGNITURE);

    if(!decoded){
        return res.status(400).json({message:"invalid token"});
    }
    
    req.id=decoded.d;
    next();}
    catch(error){
        return res.status(500).json({message:"ctch error", error:error.stack});
    }
}
