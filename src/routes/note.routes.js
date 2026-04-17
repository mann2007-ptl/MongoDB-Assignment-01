const express = require("express");
const {createNote , createNoteBulk , getAllNotes , getNoteById , replaceNote , updateNote , deleteNote , deleteNotesBulk } = require("../controllers/note.controller");

const router = express.Router();

router.post("/",createNote);
router.post("/bulk",createNoteBulk);


router.get("/",getAllNotes);
router.get("/:id",getNoteById);


router.put("/:id", replaceNote);
router.patch("/:id", updateNote);


router.delete("/bulk", deleteNotesBulk);
router.delete("/:id", deleteNote);



module.exports = router;