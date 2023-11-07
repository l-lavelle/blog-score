const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  pictureLink: {
    type: String,
  },
  //   author: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   postComments: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Comment",
  //     },
  //   ],
  tags: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
