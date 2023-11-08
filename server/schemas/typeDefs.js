//TODO: update user with all fields
const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    role:String
    posts: [Post]
    comments: [Comment]
  }
  type Post{
    _id:ID 
    postTitle:String
    postText:String
    pictureLink:String
    author: User
    postComments: [Comment]
    createdAt: String
    tags: [String]
    likes: Int
  }
  type Comment{
    _id:ID
    commentText: String
    author: User
  }
  input PostInput{
    postTitle:String
    postText:String
    pictureLink:String
    createdAt: String
    tags: [String]
  }
  input UserInput{
    firstName:String
    lastName:String
    username:String
    password:String
  }
  type Auth {
    token: ID
  }
  type Query {
    users: [User]
    posts: [Post]
    comments:[Comment]
  }
  type Mutation {
    addUser(user:UserInput): Auth
    login(username: String, password: String): Auth
    updateUser(criteria:UserInput):User
    deleteUser:User
    adminDelete(userId:ID):User
    addPost(postTitle:String, postText:String, tags:String):Post
    updatePost(criteria: PostInput, postId:ID):Post
    deletePost(postId:ID):Post
    addComment(commentText:String, postId:ID):Comment
    updateComment(commentText:String):Comment
    # deleteComment:
  }
`;
module.exports = typeDefs;
// role needs to be updatable to admin??- graphQL shield certain variables on routes??
// add if else with role variable if admin??
