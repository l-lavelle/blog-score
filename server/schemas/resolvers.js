// TODO: throw errors
// routes to add: get blog post by tag with comments
const { User, Post, Comment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //TODO not yet adding data to users will not popluate
    users: async () => {
      return await User.find({}).populate([
        {
          path: "posts",
          model: "Post",
        },
        {
          path: "comments",
          model: "Comment",
        },
      ]);
    },
    posts: async () => {
      return await Post.find({}).populate([
        {
          path: "postComments",
          model: "Comment",
        },
        {
          path: "author",
          model: "User",
        },
      ]);
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
    // working with auth: admin
    addPost: async (parent, { postTitle, postText, tags }, context) => {
      if (context.user) {
        const post = await Post.create({
          postTitle,
          postText,
          tags,
          author: context.user._id,
        });
        return post;
      }
    },
    // Update Post with _id: admin || moderator
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
    addComment: async (parent, { commentText, postId }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          author: context.user._id,
        });
        const commentId = comment._id;
        try {
          const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $addToSet: { postComments: commentId } },
            { new: true }
          );
        } catch (err) {
          console.log(err);
        }
        // need to see if this works
        try {
          const userPost = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { comments: commentId } },
            { new: true }
          );
        } catch (err) {
          console.log(err);
        }
        return comment;
      }
    },
    //Working with auth- all
    // TODO: updatedDate
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
    // Add upvote to specific post
    // TODO: add in user context to see who upvoted for recommendation engine??
    // Do we want these seperate or together in one varible ??
    upvotePost: async (parent, { postId }, context) => {
      if (context.user) {
        await Post.findOneAndUpdate(
          { _id: postId },
          { $inc: { upvotes: 1 } },
          { new: true, runValidators: true }
        );
         // Get the user's current liked keywords
         const user = await User.findById(context.user._id);
     
         // Update the count for each keyword in the post
         post.tags.forEach(tag => {
           user.likedKeywords.set(tag, (user.likedKeywords.get(tag) || 0) + 1);
         });
     
         // Save the updated user document
         await user.save();
      }
    },
    downvotePost: async (parent, { postId }, context) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
          { _id: postId },
          { $inc: { downvotes: 1 } },
          { new: true, runValidators: true }
        );
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
    
       
    
        return updatedPost;
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
