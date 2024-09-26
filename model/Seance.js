const mongoose = require("mongoose");
//l'horaire, le film associé, la salle et les tarifs
const SeanceSchema = mongoose.Schema({
  horaire: {
    type: Date,
    required: true,
  },
  film: {
    type: String,
    required: true,
  },
  salle: {
    type: String,
    required: true,
  },
  tarifs: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("Seance", SeanceSchema);

module.exports = Seance;