import { gql } from "@apollo/client";

// Query to get all users and their posts and comments
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      userPictureLink
      posts {
        _id
        postTitle
        postText
        tags
        upvotes
        postComments {
          _id
          commentText
          createdAt
        }
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
export const GET_ROLE_USER = gql`
  query basicUser {
    basicUser {
      username
      _id
      comments {
        commentText
        _id
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSinglePost($postId: ID) {
    getSinglePost(postId: $postId) {
      _id
      postTitle
      postText
      tags
      upvotes
      downvotes
      createdAt
      pictureLink
      author {
        _id
        username
        firstName
        role
        title
        lastName
      }
      postComments {
        _id
        commentText
        createdAt
        author {
          _id
          username
          userPictureLink
        }
      }
    }
  }
`;

// export const GET_POSTS = gql`
//   query getPosts {
//     posts {
//       postTitle
//       postText
//     }
//   }
// `;

// Query to get all posts with their comments and authors
export const GET_POSTS = gql`
  query posts {
    posts {
      _id
      postTitle
      postText
      tags
      upvotes
      downvotes
      pictureLink
      createdAt
      author {
        _id
        username
      }
      postComments {
        _id
        commentText
        author {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

// Query to get recommended posts based on user's liked keywords
export const GET_RECOMMENDED_POSTS = gql`
  query getRecommendedPosts {
    getRecommendedPosts {
      _id
      postTitle
      postText
      tags
      upvotes
      downvotes
      pictureLink
      createdAt
      author {
        _id
        username
        role
        firstName
      }
      postComments {
        _id
        commentText
        author {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

export const RECENT_POSTS_QUERY = gql`
  query recentPosts {
    recentPosts {
      _id
      postTitle
      postText
      upvotes
      pictureLink
      createdAt
      author {
        username
      }
    }
  }
`;

export const USER_LIKED_POSTS = gql`
  query userLikedPost {
    userLikedPost {
      likedPost {
        _id
        postTitle
        postText
        upvotes
        pictureLink
        createdAt
        author {
          username
        }
      }
    }
  }
`;

export const USER_UNLIKED_POSTS = gql`
  query userUnlikedPost {
    userUnlikedPost {
      unlikedPost {
        _id
      }
    }
  }
`;

export const SINGLE_USER = gql`
  query singleUser {
    singleUser {
      firstName
      lastName
      username
      title
      profileInfo
      role
      userPictureLink
      likedKeywords {
        keyword
        count
      }
      friends {
        username
        userPictureLink
        _id
        role
        posts {
          _id
          postTitle
          postText
          upvotes
          pictureLink
          createdAt
          author {
            username
          }
        }
      }
    }
  }
`;

export const SINGLE_USER_COMMENTS = gql`
  query singleUserComments {
    singleUserComments {
      comments {
        commentText
        createdAt
        _id
        postId {
          postText
          postTitle
        }
      }
    }
  }
`;

export const SINGLE_USER_POSTS = gql`
  query singleUserBlogs {
    singleUserBlogs {
      posts {
        postText
        postTitle
        _id
      }
    }
  }
`;

export const FIND_FRIEND = gql`
  query findFriend($userId: ID) {
    findFriend(userId: $userId) {
      _id
      username
      title
      profileInfo
      userPictureLink
      posts {
        _id
        postTitle
        postText
        upvotes
        pictureLink
      }
      likedKeywords {
        keyword
        count
      }
    }
  }
`;
// Query to get all comments with their authors
// export const GET_COMMENTS = gql`;
//   query getComments {
//     comments {
//       _id
//       commentText
//       author {
//         _id
//         username
//       }
//       createdAt
//     }
//   }
// `;

// Export all queries as a single object (optional)
// const queries = {
//   GET_USERS,
//   GET_POSTS,
//   GET_RECOMMENDED_POSTS,
// GET_COMMENTS
// };

// export default queries;
