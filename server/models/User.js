// TODO: add in comments and posts when written
// Overall user score?? default 100
// Validation and bycrypt password

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
