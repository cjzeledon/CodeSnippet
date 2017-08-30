const UserBox = require('./schema_user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/SnippetOrgan');

function handleSuccess(){
  console.log('Your user has been created and saved!');
};

function handleError(err){
  console.log(err)
};

UserBox.create({
  userName: 'Juliet',
  userPassword: 'motocross',
  })
    .then(handleSuccess)
    .catch(handleError);



////////////// CREATED USERNAMES AND PASSWORDS THAT ARE STORED IN DATABASE ////////////////
// userName: Sophia;
// userPassword: running;

// userName: Juliet
// userPassword: motocross
