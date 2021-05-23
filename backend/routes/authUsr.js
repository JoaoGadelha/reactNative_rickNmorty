let express = require("express");
let authUsr = express.Router();
let usrSchema = require("../usrSchema");

authUsr.post("/", async (req, res) => {
  try {
    if (req.body.email !== "" && req.body.password !== "") {
      const usrData = await usrSchema.find({
        email: req.body.email,
      });
    } else {
      res.json({ message: "-3" });
    }
    if (usrData.length === 0) {
      //usuario nao existe
      res.json({ message: "-1" });
    } else {
      if (usrData[0].password !== req.body.password) {
        // password errado
        res.json({ message: "-2" });
      } else {
        res.json({
          clientID: usrData[0]._id,
          favorites: usrData[0].favorites,
          message: "loggedin",
        });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = authUsr;
