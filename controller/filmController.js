const Film = require('../model/Film');

exports.getFilms = async (req, res) => {
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