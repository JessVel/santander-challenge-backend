const UserModel = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.validateUser = async (req, res) => {
  //extraer user, password y tipo de usuario
  const { user, password } = req.body;

  try {
    let userData = await UserModel.findOne({ user });
    if (!userData) {
      return res.status(400).json({ msg: "The user does not exists." });
    }

    const passValidate = await bcryptjs.compare(password, userData.password);

    if (!passValidate) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const payload = {
      user: {
        id: userData.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Obtener usuario autenticado
exports.userAuthentic = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.user.id);
    res.json({ userData });
  } catch (error) {
    res.status(500).json({ msg: "There's been an error" });
    console.log(error);
  }
};
