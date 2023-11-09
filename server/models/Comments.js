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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dayjs(timestamp).format("DD/MM/YYYY"),
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
