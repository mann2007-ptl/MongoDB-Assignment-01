const express = require("express");
const {createNote , createNoteBulk } = require("../controllers/note.controller");

const router = express.Router();

router.post("/",createNote);
router.post("/bulk",createNoteBulk);


module.exports = router;