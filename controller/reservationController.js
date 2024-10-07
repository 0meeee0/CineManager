const Reservation = require("../model/Reservation");
const Seat = require("../model/Seat");

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ isDeleted: false })
      .populate("user", "name email")
      .populate("seance", "horaire")
      .populate("seats", "number");

    if (reservations.length === 0) {
      return res.status(404).json({ msg: "No reservations found" });
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReservation = async (req, res) => {
  try {
    const { seance, seats } = req.body;
    const user = req.user;
    if (!seance || !seats) {
      return res.status(400).json({
        msg: "Please provide all required fields (user, seance, seats)",
      });
    }

    const reservedSeats = await Seat.find({
      _id: { $in: seats },
      isReserved: true,
    });
    if (reservedSeats.length > 0) {
      return res.status(400).json({ msg: "Seat is already reserved." });
    }

    const newReservation = await Reservation.create({
      user: user.id,
      seance,
      seats,
    });

    await Seat.updateMany({ _id: { $in: seats } }, { isReserved: true });
    res
      .status(201)
      .json({ msg: "Reservation created successfully", newReservation });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating reservation", error: err.message });
  }
};
