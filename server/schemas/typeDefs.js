//TODO: update user with all fields
const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    friends: [User]
    friendCount:Int
  }
  type Comment{
    commentText: String,
    author: string,
    timestamps:Date
  }
  input UserInput{
    firstName:String,
    lastName:String,
    username:String,
    password:String
  }
  type Auth {
    token: ID
  }
  type Query {
    users: [User]
  }
  type Mutation {
    addUser(user:UserInput): Auth
    login(username: String, password: String): Auth
    updateUser(criteria:UserInput):User
    deleteUser:User
    addComment:()
    updateComment:()
    deleteComment:
    # addFriend(userId:ID!):User
    # deleteFriend(userId:ID!):User
  }
`;

module.exports = typeDefs;
