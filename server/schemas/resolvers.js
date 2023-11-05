// TODO: update user with all fields
const { User } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { first, last, username, password }) => {
      return await User.create({ first, last, username, password });
    },
  },
};

module.exports = resolvers;
