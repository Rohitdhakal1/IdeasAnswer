import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authmiddleware.js";



const router  = express.Router();

router.post('/',authMiddleware,async(req,res)=>{
    const {title , content } = req.body;

    const note = await Note.create({
        title,
        content,
        userId:req.user.id
    });

    res.json(note);
})

router.get('/',authMiddleware,async(req,res)=>{
    const notes = await Note.find({userId:TEMP_USER_ID});
    res.json(notes);
});

router.put('/:id',authMiddleware,async(req,res)=>{
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {new:true}
    );
    res.json(updateNote);
})

router.delete('/:id',authMiddleware,async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.json({message:"Note deleted"});
});


export default router;
