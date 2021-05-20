let express = require('express');
let createUser = express.Router();
let usrSchema = require('../usrSchema');



createUser.post('/', async (req, res) => {
    
     let usr = new usrSchema({
        email: req.body.email,
        password: req.body.password,
        favorites: []
    });

     try {
        newUsrInfo = await usr.save();
        res.json(newUsrInfo);
    } catch (err) {
        res.json({ message: err });
    } 
})

module.exports = createUser;