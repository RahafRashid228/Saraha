import mongoose from "mongoose";
import 'dotenv/config';
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DB_local);
        console.log("Connect");
    }catch(err){
        console.log("error to connect db",err);
    }
}
export default connectdb;