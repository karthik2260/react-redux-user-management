
import bcrypt from 'bcryptjs'
import User from '../model.js/Usermodel.js'
import { generateToken } from '../lib/Jwt.js'


const signup= async(req,res)=>{
    const {name,email,password}=req.body
    console.log(req.body);
    
    try {
        if (!name||!email||!password){
            return res.status(400).json({message:"fill the form fully"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must bet at least 6 character"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }

        
        console.log('i am back end');
        const salt= await bcrypt.genSalt(10)
        const hashedpassword= await bcrypt.hash(password,salt)
        const newUser= new User({
            name,
            email,
            password:hashedpassword,
        })
        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                
                    _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
            console.log('last one');
        }else{
            res.status(400).json({message:"invalid user data"})
        }
        
    } catch (error) {
        console.log("error in singup controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
}


const logout= async(req,res)=>{
    try {

        console.log('logout strted');
        
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout succesfully"})
        
    } catch (error) {
        console.log("error from logout",error.message);
          res.status(500).json({message:"internal server error"})
    }
 }

 const login= async(req,res)=>{
    const {email, password } = req.body;
   
    
      
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not exits"})
        }
     const ispassword=  await bcrypt.compare(password,user.password)
     if(!ispassword){
        return res.status(400).json({message:"password is wrong"})
    }
    generateToken(user._id,res);
    res.status(200).json({
       
        id:user._id,
        name:user.name,
        role:user.role,
        email:user.email,
        profilePic:user.profilePic
         
    
 
    })

    } catch (err) {
             console.log("login error",err.message);
             res.status(500).json({message:"internal error"})
    }
 }



 
export{
    signup,logout,login
}