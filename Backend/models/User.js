const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema(
  {
    Username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    fullname:{type:String,required:true},
    phone:{type:String,required:true},
    role:{type:String,enum:["Admin","NormalUser"],default:"Admin",required:true},
    address:{type:String},
    profileImage:{type:String}
  },{timestamps:true}
)
module.exports=mongoose.model('User',UserSchema);