//TODO: update user with all fields
const typeDefs = `
  type User {
    _id: ID
    first: String
    last: String
    username: String
    password: String
    friends: [User]
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(first: String!, last: String!, username: String!, password:String): User
  }
`;

module.exports = typeDefs;
