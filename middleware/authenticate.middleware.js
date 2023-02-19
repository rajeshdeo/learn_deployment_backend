const jwt= require("jsonwebtoken")

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization;

    if(token){
        //masai- secret key
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                //console.log(decoded);
                //added user with id in body with the help of request
                req.body.user=decoded.userID
                next();
            }else{
                res.send({"Msg":"Please Login"})
            }
        })
    }else{
        res.send({"Msg":"Please Login"})
    }
}

module.exports={authenticate}