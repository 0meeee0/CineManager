const mongoose = require("mongoose");
const FilmSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    poster: {
      type: String,
      required: false,
    },
    genre: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Film = mongoose.model("Film", FilmSchema);

module.exports = Film;
