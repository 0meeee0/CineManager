const mongoose = require("mongoose");
//nom, capacité, type de salle
const SalleSchema = mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    unique: true,
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Salle = mongoose.model("Salle", SalleSchema);

module.exports = Salle;