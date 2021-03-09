const MeetModel = require("../models/meet_model");
const { validationResult } = require("express-validator");

exports.createMeet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const meet = new MeetModel(req.body);
    await meet.save();
    res.json({ meet });
  } catch (error) {
    console.log(error);
    res.status(500).send("There's been an error.");
  }
};

exports.getMeets = async (req, res) => {
  try {
    const meets = await MeetModel.find();
    res.json({ meets });
  } catch (error) {
    console.log(error);
    res.status(500).send("There's been an error");
  }
};
