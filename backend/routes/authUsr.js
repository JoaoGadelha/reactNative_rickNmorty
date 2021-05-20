let express = require("express");
let authUsr = express.Router();
let usrSchema = require("../usrSchema");

authUsr.post("/", async (req, res) => {
  try {
    const usrData = await usrSchema.find({
      email: req.body.email,
    });
    
    if (usrData.length === 0) {
      res.json({ message: "User not found" });
    } else {
      if (usrData[0].password !== req.body.password) {
        res.json({ message: "Wrong password" });
      } else {
        res.json(usrData);
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = authUsr;
