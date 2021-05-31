let express = require("express");
let authUsr = express.Router();
let usrSchema = require("../usrSchema");

// fazer autenticacao com tokens (jwt)
authUsr.post("/", async (req, res) => {
  try {
    let usrData;
    console.log(req.body);
    if (req.body.email !== "" && req.body.password !== "") {
      usrData = await usrSchema.find({
        email: req.body.email,
      });
    } else {
      // trocar numeros por codigos
      // campos de email ou password estao vazios
      return res.json({ message: "-3" });
    }
    if (usrData.length === 0) {
      //usuario nao existe
      return res.json({ message: "-1" });
    } else {
      if (usrData[0].password !== req.body.password) {
        // password errado
        return res.json({ message: "-2" });
      } else {
        return res.json({
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
