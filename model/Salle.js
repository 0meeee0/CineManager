const mongoose = require("mongoose");
//nom, capacité, type de salle
const SalleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Salle", SalleSchema);

module.exports = Salle;