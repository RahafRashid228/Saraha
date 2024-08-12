
import mongoose,{Schema,model} from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        
    },
    gender:{
       type:String ,
       enum:['Mail','Female']
    },
    confirmemail:{
     type:Boolean,
     default:false   
    }

},{
    timestamps:true,
})

const UserModel=mongoose.model('User',userSchema);
export default UserModel;