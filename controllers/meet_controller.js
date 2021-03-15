const MeetModel = require("../models/meet_model");
const { validationResult } = require("express-validator");
const transporter = require("../config/mailer");
const moment = require("moment");

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

  //send email
  try {
    const infoAssis = [req.body.assistants];

    console.log(infoAssis);

    await infoAssis.forEach(item => {
      transporter.sendMail({
        from: `Hello!👋 ${process.env.EMAIL}`,
        to: item,
        subject: "New meeting!🍻",
        html: `
        <h1>New meeting!</h1>
        <h2>You been invited to ${req.body.name}</h2>
        <p>On ${moment(req.body.date).format("L")}</p>
        <p>The temperature that day will be <b>${req.body.temp} C°</b></p>
        <footer>See you there!👋</footer>
        `,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMeets = async (req, res) => {
  try {
    const meets = await MeetModel.find();
    res.json(meets);
  } catch (error) {
    console.log(error);
    res.status(500).send("There's been an error");
  }
};

exports.editMeet = async (req, res) => {
  try {
    const { assistance } = req.body;
    console.log(assistance);
    const newMeet = {};

    newMeet.assistance = assistance;

    const meet = await MeetModel.findOneAndUpdate({ _id: req.params.id }, newMeet, { new: true });

    res.json(meet);
  } catch (error) {
    console.log(error);
    res.status(400).send("There's been an error");
  }
};

exports.deleteMeet = async (req, res) => {
  try {
    let meet = await MeetModel.findById(req.params.id);

    if (!meet) {
      res.status(404).json("The meeting does not exists");
    }

    await MeetModel.findByIdAndRemove({ _id: req.params.id });

    res.json({ msg: "The meeting has been deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's been an error");
  }
};
