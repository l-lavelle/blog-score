//TODO: update user with all fields
const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    password: String
    friends: [User]
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, password:String): User
    addFriend(userId:ID!):User
  }
`;

module.exports = typeDefs;
