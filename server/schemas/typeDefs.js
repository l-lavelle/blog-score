const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    role:String
    title:String
    profileInfo:String
    likedPost:[Post]
    unlikedPost:[Post]
    posts: [Post]
    comments: [Comment]
    friends:[User]
    likedKeywords: [KeywordCount] # Define it as an array of KeywordCount
  }
  type KeywordCount {
    keyword: String
    count: Int
  }
  type Post{
    _id:ID 
    postTitle:String
    postText:String
    pictureLink:String
    author: User
    postComments: [Comment]
    createdAt: String
    updatedAt: String
    tags: [String]
    upvotes: Int
    downvotes:Int
  }
  type Comment{
    _id:ID
    commentText: String
    author: User
    createdAt:String
    postId:Post
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
    role:String
    title:String
    profileInfo:String
  }
  type Auth {
    token: ID
  }
  type Query {
    users: [User]
    singleUser:User
    singleUserComments:User
    singleUserBlogs:User
    findFriend(userId:ID):User
    userLikedPost:User
    userUnlikedPost:User
    basicUser:[User]
    posts: [Post]
    comments:[Comment]
    getRecommendedPosts: [Post]
    recentPosts: [Post]
    getSinglePost(postId:ID):Post
  }
  type Mutation {
    addUser(user:UserInput): Auth
    login(username: String, password: String): Auth
    updateUser(criteria:UserInput):User
    deleteUser:User
    adminDelete(userId:ID):User
    addPost(postTitle:String, postText:String, tags:[String], pictureLink:String):Post
    updatePost(criteria: PostInput, postId:ID):Post
    deletePost(postId:ID):Post
    addComment(commentText:String, postId:ID):Comment
    updateComment(commentId:ID, commentText:String):Comment
    deleteComment(commentId:ID):Comment
    upvotePost(postId:ID): Post
    downvotePost(postId:ID):Post
    addFriend(userId:ID):User
    deleteFriend(userId:ID):User
  }
`;
module.exports = typeDefs;
