const express = require('express');
const router = express.Router();
var fetchuser = require('./middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1: get all the Note using : GET "/api/auth/getuser". login required
router.get('/fetchallNote',fetchuser,async (req,res)=>{
    try {
        const note = await Note.find({user: req.user.id});
        res.json(note)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error");
      }
})

//ROUTE 2 : add a new Note using : POST "/api/auth/getuser". login required
router.post('/addnote',fetchuser,[
    body('title','Enter valid title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        //if there are error return  BAd request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()});
        }
    
        const note = new Note({
            title,description,tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        console.log(savedNote);
        res.json(savedNote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error");
      }
})

//ROUTE 3: add a new Note using : PUT "/api/auth/updatenote". login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        
    const {title, description ,tag,imp}= req.body;

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
     {newNote.imp = imp}

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
    res.json({note});
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error");
      }
})


//ROUTE 4 : add a new Note using : PUT "/api/auth/deletenote". login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
     try {

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note: note});
}  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
})

module.exports = router