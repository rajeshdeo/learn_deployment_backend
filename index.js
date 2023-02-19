const express= require("express")
const {connection}= require("./db")
const app= express();
const {userRouter}=require("./routes/User.route")
const {noteRouter}= require("./routes/Note.route")
const {authenticate}= require("./middleware/authenticate.middleware")
app.use(express.json());
const cors= require("cors");
require("dotenv").config();


app.get("/",(req,res)=>{
    res.send("Home Page");
})
//correct the cors here 
app.use(cors());
app.use("/users",userRouter);
//using middleware
app.use(authenticate);
app.use("/notes",noteRouter);




app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to Mongo DB");
    }
    catch(err){
        console.log(err.message);    }
    console.log(`Server is running at ${process.env.port}`)
})