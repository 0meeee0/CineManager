const Comment = require("../model/Comment");
const User = require("../model/Users");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      return res.json({ msg: "No Comments Found" });
    } else {
      res.json({ comments });
    }
  } catch (err) {
    res.send(err);
  }
};


exports.addComment = async (req, res) => {
  try {
    const { film_id, comment } = req.body;
    const user = req.user;

    if (!comment) {
      return res.status(400).json({ msg: "Empty Comment" });
    }

    const newComment = await Comment.create({
      user_id: user.id,
      film_id,
      comment,
    });

    const populatedComment = await newComment.populate("user_id", "name");

    res.status(201).json({
      message: "Comment added successfully.",
      comment: populatedComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment." });
  }
};


exports.getCommentsByFilmId = async (req, res) => {
  try {
    const { film_id } = req.params;

    const comments = await Comment.find({ film_id })
      .populate("user_id", "name role")
      .exec();

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};