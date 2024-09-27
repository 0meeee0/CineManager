const Film = require('../model/Film');

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
exports.addFilm = async (req, res) => {
    try{
        // if(!(req.title || req.genre)){
        //     res.send("All fields must be filled")
        // }
        const newFilm = await Film.create(req.body);
        res.json(newFilm);
    }catch(err){
        res.status(400).json({err});
    }
}

exports.editFilm = async(req, res) => {
    try{
        const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedFilm){
            return res.status(404).json({msg: "Film not found"});
        }
        res.json(updatedFilm);
    }catch(err){
        res.status(500).json({err});
    }
}

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