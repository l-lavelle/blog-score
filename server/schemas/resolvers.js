// TODO: throw errors
// routes to add: get blog post by tag with comments
// add me route to find self
// Problem with get recommended routes
const { User, Post, Comment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  User: {
    // This resolver will convert the Map to an array of objects
    likedKeywords(user) {
      // Convert the map to an array of objects
      return Array.from(user.likedKeywords, ([keyword, count]) => ({
        keyword,
        count,
      }));
    },
  },
  Query: {
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
    singleUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
    },
    singleUserComments: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate([
          {
            path: "comments",
            model: "Comment",
          },
          {
            path: "comments",
            populate: {
              path: "postId",
              model: "Post",
            },
          },
        ]);
      }
    },
    basicUser: async () => {
      return await User.find({ role: "user" }).populate([
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
    getSinglePost: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId }).populate([
        {
          path: "postComments",
          model: "Comment",
        },
        {
          path: "postComments",
          populate: {
            path: "author",
            model: "User",
          },
        },
        {
          path: "author",
          model: "User",
        },
      ]);
    },
    userLikedPost: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate([
          {
            path: "likedPost",
            model: "Post",
          },
        ]);
        return user;
      }
    },
    userUnlikedPost: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate([
          {
            path: "unlikedPost",
            model: "Post",
          },
        ]);
        return user;
      }
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
    getRecommendedPosts: async (parent, args, context) => {
      if (context.user) {
        // Get the user's liked keywords
        const user = await User.findById(context.user._id);
        const likedKeywords = Array.from(user.likedKeywords.keys());

        // Fetch all posts
        let allPosts = await Post.find({}).populate([
          {
            path: "postComments",
            model: "Comment",
          },
          {
            path: "author",
            model: "User",
          },
        ]);

        // Sort posts based on whether they match the user's liked keywords and their upvotes
        allPosts.sort((a, b) => {
          const aMatches = a.tags.some((tag) => likedKeywords.includes(tag));
          const bMatches = b.tags.some((tag) => likedKeywords.includes(tag));

          if (aMatches && !bMatches) {
            return -1; // a has priority
          } else if (!aMatches && bMatches) {
            return 1; // b has priority
          } else {
            // If both match or both don't match, sort by upvotes
            return b.upvotes - a.upvotes;
          }
        });

        return allPosts;
      } else {
        throw new Error("You must be logged in to get recommendations");
      }
    },

    comments: async () => {
      return await Comment.find({}).populate("author");
    },

    recentPosts: async () => {
      return await Post.find({}).sort({ createdAt: -1 }).limit(5);
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
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: criteria },
        { new: true, runValidators: true }
      );
      return updateUser;
    },
    //working with auth: all
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
    },
    // Admin delete any user account
    adminDelete: async (parent, { userId }) => {
      const user = await User.findOneAndDelete({ _id: userId });
      const comments = await Comment.deleteMany({ author: userId });
      return user;
    },
    // working with auth: admin
    addPost: async (parent, { postTitle, postText, tags }, context) => {
      if (context.user.role === "admin") {
        const post = await Post.create({
          postTitle,
          postText,
          tags,
          author: context.user._id,
        });
        const postId = post._id;
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: postId } },
          { new: true }
        );
        return post;
      }
    },
    // Update Post with _id: admin || moderator
    updatePost: async (parent, { criteria, postId }) => {
      return await Post.findOneAndUpdate(
        { _id: postId },
        { $set: criteria },
        { new: true, runValidators: true }
      );
    },
    // Delete post with _id: admin || moderator??
    deletePost: async (parent, { postId }, context) => {
      const post = Post.findOneAndDelete({ _id: postId });
      const comments = await Comment.deleteMany({ postId: postId });
      return post;
    },
    // Working with auth- all
    addComment: async (parent, { commentText, postId }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          author: context.user._id,
          postId: postId,
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
    // error ??- update if verified that its your comment??
    updateComment: async (parent, { commentId, commentText }, context) => {
      const comment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { $set: { commentText } },
        { new: true, runValidators: true }
      );
      return comment;
    },
    // Delete comment by id- delete if verified that its your comment??
    deleteComment: async (parent, { commentId }) => {
      return Comment.findOneAndDelete({ _id: commentId });
    },
    // Add upvote to specific post
    // TODO: add in user context to see who upvoted for recommendation engine??
    // Do we want these seperate or together in one varible ??
    upvotePost: async (parent, { postId }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to upvote a post.");
      }

      // Find the post and increment upvotes
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { upvotes: 1 } },
        { new: true }
      ).populate("tags");

      const userLikes = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { likedPost: postId } },
        { new: true }
      );
      if (!post) {
        throw new Error("Post not found.");
      }

      // Find the user and update likedKeywords
      const user = await User.findById(context.user._id);

      if (!user) {
        throw new Error("User not found.");
      }

      post.tags.forEach((tag) => {
        user.likedKeywords.set(tag, (user.likedKeywords.get(tag) || 0) + 1);
      });

      // Save the updated user document
      await user.save();

      return post; // If you want to return the updated post instead of user
    },
    downvotePost: async (parent, { postId }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to unlike a post.");
      }

      // Find the post and increment upvotes
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { upvotes: -1 } },
        { new: true, runValidators: true }
      );

      if (!post) {
        throw new Error("Post not found.");
      }

      // Find the user and update likedKeywords
      const user = await User.findById(context.user._id);

      if (!user) {
        throw new Error("User not found.");
      }

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { likedPost: postId } },
        { new: true }
      );

      post.tags.forEach((tag) => {
        user.likedKeywords.set(tag, (user.likedKeywords.get(tag) || 0) - 1);
      });

      await user.save();

      return post;
    },
    // if wanted friend or follower functionality
    addFriend: async (parent, { userId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: userId } },
          { new: true, runValidators: true }
        );
      }
    },
    deleteFriend: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: userId } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
