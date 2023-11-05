// TODO: update user with all fields
const { User } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("friends");
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, username, password }) => {
      return await User.create({ firstName, lastName, username, password });
    },
    updateUser: async (parent, { criteria }, context) => {
      if (context) {
        return await User.findOneAndUpdate(
          { _id: context._id },
          { $set: criteria },
          { new: true, runValidators: true }
        );
      }
    },
    addFriend: async (parent, { userId }, context) => {
      if (context) {
        console.log("context.id: ", context._id);
        return await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { friends: userId } },
          { new: true, runValidators: true }
        );
      }
    },
    deleteFriend: async (parent, { userId }, context) => {
      if (context) {
        return User.findOneAndUpdate(
          { _id: context._id },
          { $pull: { friends: userId } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
