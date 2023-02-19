const express= require("express");
const {UserModel}= require("../model/User.model")
const userRouter= express.Router();
const jwt= require("jsonwebtoken")
const bcrypt= require('bcrypt');
//const e = require("express");

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}= req.body;
   
    try{
//hashing the password
        bcrypt.hash(pass, 5, async(err, hash)=> {
            // Store hash in your password DB.
        if(err){
            res.status(400).send({"msg":"Something went wrong in decrypting password","Err":err.message})
        }
        else{
            const user= new UserModel({name,email,pass:hash});
            await user.save();
            res.send({"Msg":"New User Registered",user})
   
       }
        
       });

     }
   catch(err){
    res.send({"msg":"Something went wrong in registering","Err":err.message})
   }
   

})
userRouter.post("/login",async(req,res)=>{
   
    const {email,pass}= req.body;
    //console.log(email,pass)
    try{
        const user= await UserModel.find({email})
        if(user.length>0)
        {
               // console.log(user);
             // Load hash from your password DB.
            bcrypt.compare(pass,user[0].pass, (err, result)=> {
                // result == true
               //console.log(result)
                if(result){
                   let token= jwt.sign({ userID:user[0]._id }, 'masai');
                  // console.log(token)
                   //random course:"backend"  ans masai
                   //let token= jwt.sign({ course:"backend" }, 'masai');
                    res.send({"msg":"Logged in","Token":token})
                
                }
                else{
                    res.send({"msg":"Something went wrong in encrypting password"})
                }
            });

        }
        else{
            res.send({"Msg":"Wrong Credentials in Login"})
        }
     
    }
    catch(err){
        res.send({"msg":"Something went wrong in Login","Err":err.message})
       }
 
    })


 module.exports={userRouter};
