const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seance",
    required: true,
  },
  seats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
},{
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
