const Comment = require("../model/Comment");
const User = require("../model/Users");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user_id");
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
      const {film_id, comment } = req.body;
    const user = req.user;
    // res.send(user)
    if(!comment){
        res.json({msg: "Empty Comment"})
    }
    const newComment = await Comment.create({
      user_id: user.id,
      film_id,
      comment,
    });
    // const saveComment = newComment.save();
    res.status(201).json({
      message: "Comment added successfully.",
      comment: newComment,
    });
  } catch (err) {
    res.json({error: err});
  }
};
