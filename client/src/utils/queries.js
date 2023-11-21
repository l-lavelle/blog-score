import { gql } from "@apollo/client";

// Query to get all users and their posts and comments
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
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
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSinglePost($postId: ID) {
    getSinglePost(postId: $postId) {
      postComments {
        commentText
        createdAt
        author {
          username
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
  query getPosts {
    posts {
      _id
      postTitle
      postText
      tags
      upvotes
      downvotes
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

export const RECENT_POSTS_QUERY = gql`
  query recentPosts {
    recentPosts {
      _id
      postTitle
      postText
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
// Query to get all comments with their authors
// export const GET_COMMENTS = gql`
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
