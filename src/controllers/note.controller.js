const mongoose = require("mongoose")
const Note = require("../models/note.model");

// ------------------- creating new notes (route-1) ----------------------------
const createNote = async (req, res) => {
    try {
        const { title, content, category, isPinned } = req.body;

        const newNote = new Note({ title, content, category, isPinned });
        await newNote.save();

        res.status(201).json({
            "success": true,
            "message": "Note created successfully",
            "data": newNote
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        });
    }
}




// ------------------- creating multiple notes together (route-2) ----------------------------

const createNoteBulk = async (req, res) => {
    try {
        const { notes } = req.body;

        const newNote = await Note.insertMany(notes);

        res.status(201).json({
            success: true,
            message: `${newNote.length} notes created successfully`,
            data: newNote
        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        });
    }
}




module.exports = {
    createNote, createNoteBulk
}