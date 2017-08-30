//NOTE: {} is an object and [] is an array

const SnipBox = require('./models/schema_snippet');
const PeepBox = require('./models/schema_user');
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static("views"));
app.use(session({
  secret: 'kljweisdnsduene93fmckwh93',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

mongoose.connect('mongodb://localhost:27017/SnippetOrgan');

const people = [
  { peoName: 'Lourdes', peoPass: 'samsung' },
  { peoName: 'Christina', peoPass: 'loves' },
  { peoName: 'Alexandro', peoPass: 'bandsong' },
];

// sets the search.mustache as the main page
app.get('/', function(req, res){
  res.render('search');
});

//creates a sign up page for potential users to create account
app.get('/signup', function(req, res){
  res.render('signup');
})

// app.get('/search', function(req, res){
//   if (request.session.who !== undefined){
//     res.render('search', {
//       whoName: req.session.who.
//       whoPass: req.session.who.
//     })
//   }
//   res.render('search');
// });

//Create new account
app.post('/signup', function(req, res){
  let signupName = req.body.signup_username;
  let signupPass = req.body.signup_password;

  PeepBox.create({
    userName: signupName,
    userPassword: signupPass,
    })
    .then(function(err, snap){
    console.log(err);
    res.redirect('/');
    });
});

//Creating new snippet code to the database via form provided on the site
app.post('/add', function(req, res){
  let addTitle = req.body.add_title;
  let addBody = req.body.add_body;
  let addNote = req.body.add_note;
  let addLanguage = req.body.add_language;
  let addTag = req.body.add_tag;

  SnipBox.create({
    snippetTitle: addTitle,
    snippetBody: addBody,
    snippetNotes: addNote,
    snippetLanguage: addLanguage,
    snippetTags: [addTag],
  }).then(function(err, snip){
    console.log(err);
    res.redirect('/');
  });
});

//Search for information via title, language or tag or all three and return result(s)
app.post('/search', function(req, res){
  let searchTitle = req.body.search_title;
  let searchLanguage = req.body.search_language;
  let searchTag = req.body.search_tags;

  console.log(searchTag);

  if(searchLanguage !== ''){
    console.log('Lang');
    SnipBox.find({
      snippetLanguage: searchLanguage,
    })
    .then(function(result){
      res.render('search', {
        snipblah: result,
      });
    })
      .catch(function(){
        console.log("I didn't work dammit!");
      });
  } else if (searchTitle !== ''){
    console.log('Title');
    SnipBox.find({
      snippetTitle: searchTitle,
    })
    .then(function(result){
      console.log(result);
      res.render('search', {
        snipblah: result,
      });
    })
      .catch(function(){
        console.log("I didn't work dammit!");
      });
  } else if (searchTag !== ''){
    console.log('tag');
    SnipBox.find({
      snippetTags: searchTag,
    })
    .then(function(result){
      console.log(result);
      res.render('search', {
        snipblah: result,
      });
    })
      .catch(function(){
        console.log("I didn't work dammit!");
      });
  } else {
    //If all the inputs are left empty and you hit the search button, it will show ALL snippet results. Did this on purpose if a user wants to view all snippets instead of searching for one language, tag or title of a snippet.
    SnipBox.find()
    .then(function(result){
      console.log(result);
      res.render('search',{
        snipblah: result,
      })
    })
  };
});

//Checking username and password and grant access if correct information is provided
//use username = Sophia and password = running or username = Juliet and password = motocross to get access. These information are actually in the database.
app.post('/', function(req, res){
  const logname = req.body.login_username;
  const logpass = req.body.login_password;
  let person = null;

  // PeepBox.find({
  //   userName: logname,
  //   userPassword: logpass
  // }).then(function(access){
  //   for (let i = 0; i < PeepBox.length; i++){
  //     if (logname === PeepBox[i].userName && logpass === PeepBox[i].userPassword){
  //       person = PeepBox[i];
  //       req.session.who = person;
  //     };
  //   };
  //
  //   if (person !== null){
  //     respond.redirect('/');
  //   } else {
  //     respond.redirect('/signup');
  //   };
  // })

  for (let i = 0; i < people.length; i++){
    if (logname === people[i].peoName && logpass === people[i].peoPass){
      person = people[i];
    }
  }

  if (person != null){
    req.session.who = person;
    res.redirect('/');
    } else {
    res.redirect('/signup');
  };
});

//view all your collection of snippets on the page
app.get('/collection', function(req, res){
  SnipBox.find()
  .then(function(shipITall){
    res.render('collection',{
      box: shipITall,
    });
  });
});

app.listen(3000, function(){
  console.log("It's Schema Time!")
})
