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
    addFriend: async (parent, { userId }, context) => {
      if (context) {
        console.log(context._id);
        return await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { friends: userId } },
          { new: true, runValidators: true }
        );
      }
    },
  },
};

module.exports = resolvers;
