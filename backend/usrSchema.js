
const mongoose = require('mongoose');
 
 const usrSchema = new mongoose.Schema({
   email: String,
   password: String,
   favorites: [Number]
}, { collection: 'rickmortyapp' });

module.exports = mongoose.model('rickmortyapp', usrSchema);