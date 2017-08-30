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
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

mongoose.connect('mongodb://localhost:27017/SnippetOrgan');

//log in page
// right now, it is render to collection.mustache as I am working on the log in
app.get('/', function(req, res){
  res.render('collection');
});

app.get('/search', function(req, res){
  res.render('search');
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
  let searchTag = req.body.search_tag;

  // if(searchLanguage !== ''){
  //   SnipBox.find({
  //     snippetLanguage: searchLanguage
  //   })
  //   .then(function(result){
  //     console.log(result);
  //     res.render('search', {
  //       snipblah: result,
  //     });
  //   })
  //     .catch(function(){
  //       console.log("I didn't work dammit!");
  //     });
  // };

  if(searchLanguage !== ''){
    SnipBox.find({
      snippetLanguage: searchLanguage,
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
  } else if (searchTitle !== ''){
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
  };
});

// app.post('/formAdd', function(req, res){
//   let addbookName = req.body.add_bookName;
//   let addbookAuthor = req.body.add_bookAuthor;
//   let addbookSeries = req.body.add_bookSeries;
//   let addbookSeriesNum = req.body.add_bookSeriesNum;
//   let addbookGenre = req.body.add_bookGenre;
//   let addbookDescription = req.body.add_bookDescription;
//   let addbookCover = req.body.add_bookCover;
//
//   BookInfo.create({
//     bookName: addbookName,
//     bookAuthor: addbookAuthor,
//     bookDetails:{
//       bookSeries: addbookSeries,
//       bookSeriesNum: addbookSeriesNum, },
//     bookGenre: addbookGenre,
//     bookDescription: addbookDescription,
//     bookCover: addbookCover
//     })
//     .then(function (err, book) {
//       console.log(err);
//       res.redirect('/');
//   });
// });
//Checking username and password and grant access if correct information is provided
// app.post('/', function(req, res){
//   const login_username = req.body.login_userName;
//   const login_password = req.body.login_passWord;
//   let person = null;
//
//   PeepBox.findOne({
//     user: userName,
//     pass: userPassword
//   })
//
//   for (let i = 0; i < _______.length; i++){
//     if (login_username === user && login_password === pass){
//       // person = _______[i];
//       request.session.who = person;
//     }
//   }
//
//   if (person !== null){
//     respond.redirect('/collection');
//   } else {
//     respond.redirect('/index');
//   };
// });

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
