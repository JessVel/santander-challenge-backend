const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("user", "El usurio es obligatirio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 6 }),
  ],
  userController.createUser
);

router.get("/", userController.getUser);

module.exports = router;
