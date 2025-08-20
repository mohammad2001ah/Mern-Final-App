const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const path=require('path');

//get all user
exports.getAllUser =async(req,res)=>{
  try {
    const user= await User.find();
    res.status(200).json({
      message:"all user",
      user:user
    })
  } catch (error) {
    console.error(`Error: ${error.message}`);
      res.status(500).json({
          message:'Server error',
          error:error.message});
  }
}
exports.register=async(req,res)=>{
  try {
    const{Username,email,password,fullname,phone,address}=req.body;
    //const profileImage = req.file ? req.file.path : null;
    
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({msg:'User Already exists'});
    }

    const hasedPass=await bcrypt.hash(password,10);

    const newUser=new User({
      Username:Username,
      email:email,
      password:hasedPass,
      fullname:fullname,
      phone:phone,
      address:address,
      //profileImage:profileImage,
    });
    await newUser.save();

    const token =jwt.sign(
      {id:newUser._id, role:newUser.role},
      process.env.SECRET_KEY,{expiresIn:"1d"}
    );
    res.json({token,user:newUser});

  } catch (error) {
    res.status(500).json({msg:"server error",error:error.message});
  }
};
// login
exports.login =async(req,res)=>{
  try {
    const{email,password}=req.body;
    const user =await User.findOne({email});
    console.log("is run");
    if(!user){
      console.log("error 1")
      return res.status(400).json({msg:"invalid email or passwords"});
    }
    console.log("error 2")

    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){
      console.log("error 3")
      return res.status(400).json({msg:"invalid email or passwords"});

    }
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
    return res.json({token,user})
    console.log("error 4")

  } catch (error) {
    return res.status(500).json({msg:"Server Error" , error :error.message});
  }
}
// login