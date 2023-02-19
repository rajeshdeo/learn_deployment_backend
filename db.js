const mongoose= require("mongoose");
require("dotenv").config();

//"mongodb://127.0.0.1:27017/notespsc"
const connection= mongoose.connect(process.env.nodeURL);

module.exports={connection};