const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const path=require('path');

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