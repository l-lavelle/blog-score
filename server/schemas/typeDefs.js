//TODO: update user with all fields
const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    password: String
    friends: [User]
    friendCount:Int
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, password:String): User
    updateUser():User
    addFriend(userId:ID!):User
  }
`;

module.exports = typeDefs;
