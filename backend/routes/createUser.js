let express = require('express');
let createUser = express.Router();
let usrSchema = require('../usrSchema');
const bcrypt = require("bcrypt");



createUser.post('/', async (req, res) => {

    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    let usr = new usrSchema({
      email: req.body.email,
      password: hashedPassword,
      favorites: [],
    });


     try {
        newUsrInfo = await usr.save();
        res.json(newUsrInfo);
    } catch (err) {
        res.json({ message: err });
    } 
})

module.exports = createUser;