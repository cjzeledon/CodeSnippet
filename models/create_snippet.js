const SnippetBox = require('./schema_snippet');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/SnippetOrgan');

function handleSuccess(){
  console.log('Your snippet has been created and saved!');
};

function handleError(err){
  console.log(err)
};

SnippetBox.create({
  snippetTitle: 'Select',
  snippetBody: 'SELECT column1, column2 FROM table_name;',
  snippetNotes: 'The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.',
  snippetLanguage: 'Javascript',
  snippetTags: ['SQL', 'Select', 'Statement'],
  })
    .then(handleSuccess)
    .catch(handleError);

// SnippetBox.create([{
//   snippetTitle: 'The If Statement',
//   snippetBody: 'if (condition) { block of code to be executed if the condition is true}',
//   snippetNotes: 'Use the if statement to specify a block of JavaScript code to be executed if a condition is true.',
//   snippetLanguage: 'Javascript',
//   snippetTags: ['If', 'Statement'],
//   }])
//     .then(handleSuccess)
//     .catch(handleError);
