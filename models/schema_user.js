const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
