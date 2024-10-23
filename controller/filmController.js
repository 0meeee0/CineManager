const { log } = require('console');
const Film = require('../model/Film');
const Minio = require("minio");
const multer = require("multer");
const path = require("path");
require('dotenv').config()
const MinioController = require("./minioController");

const minio = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "127.0.0.1",
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});
exports.getFilms = async (req, res) => {
  try {
    const films = await Film.find({ isDeleted: false });

    if (!films || films.length === 0) {
      return res.status(404).json({ msg: "No films found" });
    }

    const filmsWithUrls = await Promise.all(
      films.map(async (film) => {
        const posterUrl = await MinioController.getFileUrl(
          film.poster,
          "posters"
        );
        const videoUrl = await MinioController.getFileUrl(film.video, "videos");
        return {
          ...film.toObject(),
          posterUrl,
          videoUrl,
        };
      })
    );

    res.json(filmsWithUrls);
  } catch (error) {
    console.error("Error fetching films:", error);
    res.status(500).json({ error: error.message });
  }
};
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

exports.uploadMoviePoster = async (file, folder) => {
  const bucketName = process.env.MINIO_BUCKET_NAME;
  const fileName = `${folder}/${file.originalname}`;

  // Check if the bucket exists, create it if not
  const exists = await minio.bucketExists(bucketName);
  if (!exists) {
    await minio.makeBucket(bucketName, "us-east-1");
  }

  // Upload the file to MinIO
  await minio.fPutObject(bucketName, fileName, file.path);
  return `http://${process.env.MINIO_ENDPOINT || "127.0.0.1"}:${
    process.env.MINIO_PORT || 9000
  }/${bucketName}/${fileName}`;
};

// Controller: Add Film Handler
exports.addFilm = async (req, res) => {
  try {
    const { title, genre, description } = req.body;

    // Validate fields and files
    if (!title || !genre || !req.files.poster || !req.files.video) {
      return res.status(400).json({
        msg: "Please provide all fields and upload both a poster and video.",
      });
    }

    // Upload files to MinIO
    const posterUrl = await exports.uploadMoviePoster(
      req.files.poster[0],
      "posters"
    );
    const videoUrl = await exports.uploadMoviePoster(
      req.files.video[0],
      "videos"
    );

    // Create new film entry
    const newFilm = await Film.create({
      title,
      genre,
      description,
      poster: posterUrl,
      video: videoUrl,
    });

    res.status(201).json({
      msg: "Film added successfully",
      newFilm,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error creating film",
      error: err.message,
    });
  }
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