const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user: {
    _id: String,
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  is_admin: {
    type: String,
    default: "F",
  },
});

module.exports = mongoose.model("user", UserSchema);
