const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const postSchema = new Schema(
  {
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
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
