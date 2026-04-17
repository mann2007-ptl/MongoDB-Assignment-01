const express = require("express");
const {createNote , createNoteBulk , getAllNotes , getNoteById  } = require("../controllers/note.controller");

const router = express.Router();

router.post("/",createNote);
router.post("/bulk",createNoteBulk);


router.get("/",getAllNotes);
router.get("/:id",getNoteById);


// router.put("/:id", replaceNote);



module.exports = router;