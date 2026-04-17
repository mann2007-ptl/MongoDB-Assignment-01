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




// ------------------- getting all notes (route-3) ----------------------------


const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes
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





// ------------------- getting notes by ID (route-4) ----------------------------

const getNoteById = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid note ID",
            data: null
        });
    }

    try {
        const note = await Note.findById(id);


        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note
        });

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        });
    }

}





// REPLACE — PUT /api/notes/:id
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    if (
      title === undefined ||
      content === undefined ||
      category === undefined ||
      isPinned === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for PUT request",
        data: null
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, overwrite: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};




// UPDATE — PATCH /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};



const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};



const deleteNotesBulk = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ids array is required and cannot be empty",
        data: null
      });
    }

    for (let id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid note ID",
          data: null
        });
      }
    }

    const result = await Note.deleteMany({
      _id: { $in: ids }
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};



module.exports = {
    createNote, createNoteBulk , getAllNotes , getNoteById , replaceNote , updateNote , deleteNote , deleteNotesBulk
}