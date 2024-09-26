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
});

const Film = mongoose.model("Film", FilmSchema);

module.exports = Film;
