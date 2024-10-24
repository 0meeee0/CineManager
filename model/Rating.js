const mongoose = require('mongoose')
const RatingSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        film_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Film",
            required: true,
        },
        rating:{
            type: Number,
            required: true
        }
    }
)

const Rating = mongoose.model('Rating', RatingSchema)
module.exports = Rating