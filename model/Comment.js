const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    film_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment