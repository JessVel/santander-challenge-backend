const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const auth = require("../middleware/auth");

//Iniciar sesión
// api/auth
router.post("/", authController.validateUser);

//obtener usuario autenticado
router.get("/", auth.isUser, authController.userAuthentic);

module.exports = router;
