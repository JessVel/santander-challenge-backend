const mongoose = require("mongoose");

const MeetSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  date: {
    type: Date,
    require: true,
    trim: true,
    unique: true,
  },
  assistants: 
    {
      type: Array,
      default: [],
      emailAsistance: String,
      confirmAsistance: {type:Boolean, default: false}
    }
  
  ,
  create: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("meet", MeetSchema);
