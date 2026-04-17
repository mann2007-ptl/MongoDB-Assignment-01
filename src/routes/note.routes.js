const express = require("express");
const {createNote , createNoteBulk , getAllNotes } = require("../controllers/note.controller");

const router = express.Router();

router.post("/",createNote);
router.post("/bulk",createNoteBulk);


router.get("/",getAllNotes);


module.exports = router;