const Rating = require('../model/Rating')

exports.addRatings = async(req, res)=>{
    try{
        const {film_id, user_id, rating} = req.body
        const deja = await Rating.findOne({user_id, film_id})
        if(deja){
            deja.rating = rating
            await deja.save()
            return res.status(200).json({msg: "Rating updated !"})
        }
        const newRating = new Rating({user_id, film_id, rating})
        await newRating.save()
        res.status(201).json({message: "Rating added !"})
    }catch(err){
        res.status(500).json({err: err})
    }
}
exports.getRating = async (req, res)=>{
    try {
      const { id } = req.params;
      const ratings = await Rating.find({ film_id:id });
      if (ratings.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }

      const total = ratings.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = total / ratings.length;

      res.status(200).json({ averageRating });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch ratings." });
    }
}