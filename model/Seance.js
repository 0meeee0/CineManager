const mongoose = require("mongoose");
//l'horaire, le film associé, la salle et les tarifs
const SeanceSchema = mongoose.Schema({
  horaire: {
    type: Date,
    required: true,
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Film",
    required: true,
  },
  salle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
  },
  tarifs: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Seance = mongoose.model("Seance", SeanceSchema);

module.exports = Seance;