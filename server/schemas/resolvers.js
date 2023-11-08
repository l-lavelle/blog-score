// TODO: update user with all fields
const { User, Post, Comment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("username");
    },
    posts: async () => {
      return await Post.find({}).populate("author");
    },
    comments: async () => {
      return await Comment.find({}).populate("author");
    },
  },
  Mutation: {
    //working with auth: all
    addUser: async (parent, { user }) => {
      const userdata = await User.create({ ...user });
      const token = signToken(userdata);
      return { token };
    },
    // working with auth: all
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const passwordCheck = await user.isCorrectPassword(password);

      if (!passwordCheck) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token };
    },
    //working with auth: all for your own account only
    updateUser: async (parent, { criteria }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: criteria },
          { new: true, runValidators: true }
        );
      }
    },
    //working with auth: all
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
    },
    // Admin delete any user account
    adminDelete: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    // working with auth: admin || moderator?
    addPost: async (parent, { postTitle, postText, author }, context) => {
      if (context.user) {
        const post = await Post.create({
          postTitle,
          postText,
          author: context.user._id,
        });
        return post;
      }
    },
    // Update Post with _id: admin
    // TODO: add new author and updated date
    updatePost: async (parent, { criteria, postId }) => {
      return await Post.findOneAndUpdate(
        { _id: postId },
        { $set: criteria },
        { new: true, runValidators: true }
      );
    },
    // Delete post with _id: admin || moderator??
    deletePost: async (parent, { postId }, context) => {
      return Post.findOneAndDelete({ _id: postId });
    },
    // Working with auth- all
    addComment: async (parent, { commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          author: context.user._id,
        });
        return comment;
      }
    },
    //Working with auth- all
    updateComment: async (parent, { commentText }, context) => {
      if (context.user) {
        const comment = await Post.findOneAndUpdate(
          { _id: context.user._id },
          { $set: commentText },
          { new: true, runValidators: true }
        );
        return comment;
      }
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        // Find the post to get its keywords
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
    
        // Update the post's likes
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: 1 } },
          { new: true }
        );
    
        // Get the user's current liked keywords
        const user = await User.findById(context.user._id);
        const likedKeywords = user.likedKeywords;
    
        // Update the count for each keyword in the post
        post.tags.forEach(tag => {
          likedKeywords.set(tag, (likedKeywords.get(tag) || 0) + 1);
        });
    
        // Save the updated user document
        await user.save();
    
        return updatedPost;
      }
    },
    
      dislikePost: async (parent, { postId }, context) => {
    if (context.user) {
      return await Post.findByIdAndUpdate(
        postId,
        { $inc: { dislikes: 1 } },
        { new: true }
      );
    }
  },
  },
};

module.exports = resolvers;

// if wanted friend or follower functionality
// addFriend: async (parent, { userId }, context) => {
//   if (context) {
//     console.log("context.id: ", context._id);
//     return await User.findOneAndUpdate(
//       { _id: context._id },
//       { $addToSet: { friends: userId } },
//       { new: true, runValidators: true }
//     );
//   }
// },
// deleteFriend: async (parent, { userId }, context) => {
//   if (context) {
//     return User.findOneAndUpdate(
//       { _id: context._id },
//       { $pull: { friends: userId } },
//       { new: true }
//     );
//   }
// },
// },
