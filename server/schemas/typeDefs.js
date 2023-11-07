//TODO: update user with all fields
const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    friends: [User]
    friendCount:Int
    role:String
  }
  type Comment{
    _id:ID
    commentText: String,
    author: String,
  }
  type Post{
    _id:ID 
    postTitle:String,
    postText:String
    pictureLink:String
    author:ID
    postComments: [Comment]
    createdAt: String
    tags: [String]
  }
  input UserInput{
    firstName:String,
    lastName:String,
    username:String,
    password:String,
    role:String
  }
  type Auth {
    token: ID
  }
  type Query {
    users: [User]
    posts: [Post]
  }
  type Mutation {
    addUser(user:UserInput): Auth
    login(username: String, password: String): Auth
    updateUser(criteria:UserInput):User
    deleteUser:User
    addPost(postTitle:String, postText:String):Post
    
    # addComment:(commentText:String, author:ID)
    # updateComment:()
    # deleteComment:
    # addFriend(userId:ID!):User
    # deleteFriend(userId:ID!):User
  }
`;

module.exports = typeDefs;
