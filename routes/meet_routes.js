const express = require("express");
const router = express.Router();
const meetController = require("../controllers/meet_controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// api/meet
//create meet
router.post("/", [check("name", "El nombre es obligatorio").not().isEmpty(), check("date", "La fecha es obligatoria").not().isEmpty()], meetController.createMeet);

//get meets
router.get("/", auth.isUser, meetController.getMeets);

//edit meet
router.put("/:id", auth.isUser, meetController.editMeet);

router.delete("/:id", auth.isUser, meetController.deleteMeet);

module.exports = router;
