const mongoose = require("mongoose");

const BookSchema =new mongoose.Schema(
  {
    booktitle: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
    },
    publication_year: {
      type: String,
    },
    ISBN: {
      type: String,
    },
    genre: {
      type: String,
    },
    ratings: {
      type: Number,
    },
    imageURL:{
      type: String,
    },
    description:{
      type: String,
    }
  },
  { timeStamps: true }
);

const BookCollection = mongoose.model("book", BookSchema);

module.exports = BookCollection;