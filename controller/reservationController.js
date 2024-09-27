const Reservation = require('../model/Reservation')

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
    const { user, seance, seats } = req.body;

    if (!user || !seance || !seats) {
      return res
        .status(400)
        .json({
          msg: "Please provide all required fields (user, seance, seats)",
        });
    }

    const newReservation = await Reservation.create({ user, seance, seats });
    res
      .status(201)
      .json({ msg: "Reservation created successfully", newReservation });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating reservation", error: err.message });
  }
};
