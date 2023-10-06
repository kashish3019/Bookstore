const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true });
const datastore = mongoose.model('books_store', schema)
module.exports = datastore;