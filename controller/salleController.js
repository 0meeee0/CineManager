const Salle = require("../model/Salle");
const Seat = require("../model/Seat");
const jwt = require("jsonwebtoken");

exports.getSalles = async (req, res) => {
  const salles = await Salle.find({isDeleted: false});
  if (salles.length == 0) {
    return res.status(404).send("No salles found");
  }
  res.json(salles);
};

exports.addSalle = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.admin = decoded.userId;

    const newSalle = await Salle.create(req.body);

    const seats = [];
    for (let i = 1; i <= req.body.capacity; i++) {
      seats.push({ salle: newSalle._id, seatNumber: i });
    }
    await Seat.insertMany(seats);

    res
      .status(201)
      .json({ msg: "Salle and Seats Created Successfully", newSalle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteSalle = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    if (!salle) {
      res.status(404).send("Salle not found");
    }
    salle.isDeleted = true;
    await salle.save();
    await Seat.updateMany({ salle: req.params.id }, { isDeleted: true });
    res.json({ msg: "Salle deleted successfully", salle });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.editSalle = async (req, res) => {
    try {
      const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!salle) {
        return res.status(404).send("Salle not found");
      }
      res.json({ msg: "Salle updated successfully", salle });
    } catch (err) {
      res.status(500).json({ err });
    }
}