const Seance = require("../model/Seance");
const Film = require("../model/Film");
const Salle = require("../model/Salle");

exports.getSeances = async (req, res) => {
  try {
    const seances = await Seance.find({ isDeleted: false })
      .populate("film", "title")
      .populate("salle", "name");

    if (seances.length === 0) {
      return res.status(404).json({ msg: "No seances found" });
    }

    res.json(seances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addSeance = async (req, res) => {
  try {
    const { film, salle, horaire, tarifs } = req.body;

    if (!film || !salle || !horaire || !tarifs) {
      return res.status(400).json({
        msg: "Please provide all required fields (film, salle, horaire, tarifs)",
      });
    }

    const filmExists = await Film.findById(film);
    const salleExists = await Salle.findById(salle);

    if (!filmExists) {
      return res.status(404).json({ msg: "Film not found" });
    }

    if (!salleExists) {
      return res.status(404).json({ msg: "Salle not found" });
    }
    const newSeance = await Seance.create({ film, salle, horaire, tarifs });
    res.status(201).json({ msg: "Seance created successfully", newSeance });
  } catch (err) {
    res.status(500).json({ msg: "Error creating seance", error: err.message });
  }
};
exports.editSeance = async (req, res) => {
  try {
    const updatedSeance = await Seance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSeance) {
      return res.status(404).json({ msg: "Seance not found" });
    }

    res.json({ msg: "Seance updated successfully", updatedSeance });
  } catch (err) {
    res.status(500).json({ msg: "Error updating seance", error: err.message });
  }
};
exports.deleteSeance = async (req, res) => {
  try {
    const seance = await Seance.findById(req.params.id);
    if (!seance) {
      return res.status(404).json({ msg: "Seance not found" });
    }

    seance.isDeleted = true;
    await seance.save();

    res.json({ msg: "Seance deleted successfully", seance });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting seance", error: err.message });
  }
};