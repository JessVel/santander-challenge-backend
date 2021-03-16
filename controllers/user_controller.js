const UserModel = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea unico
    let user = await UserModel.findOne({ email });

    //Validar si existe el usuario
    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }

    //Crear modelo con datos del usuario creado
    user = new UserModel(req.body);
    console.log(user);

    //Hashear password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //Guardar usuario
    await user.save();

    //Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(400).json({ msg: "There's been an error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      res.json({ msg: "There is no users" });
      return;
    }
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send("There's been an error");
  }
};
