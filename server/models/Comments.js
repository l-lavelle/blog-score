const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // TODO: need to format date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
