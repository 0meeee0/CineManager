const Film = require('../model/Film');
const multer = require("multer");
const path = require("path");

exports.getFilms = async (req, res) => {
    try{
        const films = await Film.find({isDeleted: false});
        if(!films){
            return res.status(404).json({msg: "No films found"});
        }else{
            res.json(films);
        }
    }catch(err){
        res.status(500).json({err});
    }
}
exports.getAllFilms = async (req, res) => {
    try{
        const films = await Film.find({});
        if(!films){
            return res.status(404).json({msg: "No films found"});
        }else{
            res.json(films);
        }
    }catch(err){
        res.status(500).json({err});
    }
}

exports.get3Films = async(req, res)=>{
  try{
    const films = await Film.find().limit(3)
    res.json(films)
  }catch(err){
    res.json({err: err})
  }
}

exports.searchFilm = async (req, res) => {
    try{
        const id = req.params.id
        const film = await Film.findById(id)
        res.send(film)
    } catch(err){
        res.send(err)
    }
}
exports.latestFilm = async (req, res) =>{
    try{
        const film = await Film.find({isDeleted: false}).sort({_id: -1}).limit(1)
        res.send(film)
    } catch (err){
        res.send(err)
    }
}
exports.getDeletedFilms = async (req, res) => {
    try{
        const films = await Film.find({isDeleted: true});
        if(!films){
            return res.status(404).json({msg: "No Deleted films found"});
        }else{
            res.json({"deleted Films":films});
        }
    }catch(err){
        res.status(500).json({err});
    }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("poster");

exports.addFilm = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Error uploading file", error: err.message });
    }

    try {
      const { title, genre, description } = req.body;

      if (!title || !genre || !req.file) {
        return res
          .status(400)
          .json({ msg: "Please provide all fields and upload a poster." });
      }

      const newFilm = await Film.create({
        title,
        genre,
        description,
        poster: `/uploads/${req.file.filename}`,
      });

      res.status(201).json({ msg: "Film added successfully", newFilm });
    } catch (err) {
      res.status(400).json({ msg: "Error creating film", error: err.message });
    }
  });
};

exports.editFilm = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Error uploading file", error: err.message });
    }

    try {
      const { title, genre, description } = req.body;

      if (!title || !genre) {
        return res.status(400).json({ msg: "Please provide title and genre." });
      }

      const updateData = {
        title,
        genre,
        description,
      };

      if (req.file) {
        updateData.poster = `/uploads/${req.file.filename}`;
      }

      const updatedFilm = await Film.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedFilm) {
        return res.status(404).json({ msg: "Film not found" });
      }

      res.json({ msg: "Film updated successfully", updatedFilm });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  });
};

exports.deleteFilm = async(req, res) => {
    try{
        const deletedFilm = await Film.findById(req.params.id)
        // res.send(deletedFilm)
        if(!deletedFilm){
            return res.status(404).json({msg: "Film not found"});
        }
        deletedFilm.isDeleted = true 
        await deletedFilm.save()
        res.json({msg: "Film Successfuly Deleted !",deletedFilm});
    }catch(e){
        res.status(500).json({msg: "Error", err: e});
    }
}