import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

//signup 
router.post('/signup',async(req,res)=>{

    // get user data from req body (email and asssword)
    const {email,password} = req.body;

    // check if email exist using findOne({email})
    const existinguser = await User.findOne({email});

    // if exist return status 400 and message invalid 
    if(existinguser){
        return res.status(400).json({message:"user already exist"});
    }   
    
    // if new email - hash password  using bcrypt and salt 10 as always we dont store actual pass
    const hashPassword = await bcrypt.hash(password,10);

    // user check 
    const user = await User.create({
        email,
        password:hashPassword,
    });

    // send message and user id to client from server
    res.json({
        message:"signup succesful",
        userId:user._id,
    })
    
})

router.post('/login',async(req,res)=>{

    // same email and password fetch from body 
    const {email,password} = req.body;
    
    // check user present from using email User.findOne({email});
    const user = await User.findOne({email});
    // if not present by email send status 400 and return with invalid 
    if(!user){
        return res.status(400).json({message:"invalid credentials"});
    }
    
    // if email present comapare password 
    const isMatch = await bcrypt.compare(password,user.password);
    //if not match return status 400 and invalid credentials 
    if(!isMatch){
        return res.status(400).json({message:"invalid credentials"});
    }

    // token create  
    const token = jwt.sign(
    {
    userId:user._id
    },
    
    process.env.JWT_SECRET,
    
    {
        expiresIn:"7d"
     }
    );

    //send token as cokkies at every req or say page or refresh and move to page 
   //store the token in browser but js cannot read it 

    res.cookie("token",token,{
        httpOnly:true, // httponly so that frontend cannot steal token
    });
    
    // send message of success and userid 
    res.json({
        message:"login successful",
        userId:user._id,
    });
    
})


//logout just remove cookies
router.post('/logout',async(req,res)=>{
    res.clearCookie("token");
    res.json({message :"logout succesfull"});
})

export default router;