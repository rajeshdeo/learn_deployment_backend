const express= require("express");
const {NoteModel} = require("../model/Note.model.js")
const noteRouter= express.Router();

noteRouter.get("/",async(req,res)=>{
//read jwt verify for getting the user id here
    const notes= await NoteModel.find();
    res.send(notes)

})

noteRouter.post("/create",async(req,res)=>{
    const payload= req.body;
    const note= new NoteModel(payload);
    await note.save();
    
    
    res.send({"Msg":"Note Created"})
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteID= req.params.id;
    //console.log(noteID)
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body) 
    
    res.send("updated note")
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID= req.params.id;
   // console.log(noteID)
    await NoteModel.findByIdAndDelete({_id:noteID}) 
    
    res.send("Deleted note")
})

module.exports={noteRouter};