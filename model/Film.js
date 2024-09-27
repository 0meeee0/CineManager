const mongoose = require("mongoose");
const FilmSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
  
});

const Film = mongoose.model("Film", FilmSchema);

module.exports = Film;
