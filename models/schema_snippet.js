const mongoose = require('mongoose');


const snippetSchema = new mongoose.Schema({
  snippetTitle: String,
  snippetBody: String,
  snippetNotes: String,
  snippetLanguage: String,
  snippetTags: [String],
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
