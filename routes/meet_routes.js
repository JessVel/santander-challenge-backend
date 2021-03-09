const express = require("express");
const router = express.Router();
const meetController = require("../controllers/meet_controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// api/meet
//create meet
router.post("/", auth.isUser, [check("name", "El nombre es obligatorio").not().isEmpty(), check("date", "La fecha es obligatoria").not().isEmpty()], meetController.createMeet);

//get meetss
router.get("/", auth.isUser, meetController.getMeets);

module.exports = router;
