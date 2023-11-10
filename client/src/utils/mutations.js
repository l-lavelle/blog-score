import { gql } from '@apollo/client';

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
      token
    }
  }
`;

// Mutation for logging in a user
export const LOGIN = gql`
  mutation login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;/*

// Mutation to update a user's information
export const UPDATE_USER = gql`
  mutation updateUser($criteria: UserUpdateInput!) {
    updateUser(criteria: $criteria) {
      _id
      username
      email
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
    }
  }
`;

// Mutation for an admin to delete any user account
export const ADMIN_DELETE_USER = gql`
  mutation adminDelete($userId: ID!) {
    adminDelete(userId: $userId) {
      _id
    }
  }
`;

// Mutation to add a new post
export const ADD_POST = gql`
  mutation addPost($postTitle: String!, $postText: String!, $tags: [String]!) {
    addPost(postTitle: $postTitle, postText: $postText, tags: $tags) {
      _id
      postTitle
      postText
      tags
      upvotes
      author {
        _id
        username
      }
    }
  }
`;

// Mutation to update a post
export const UPDATE_POST = gql`
  mutation updatePost($criteria: PostUpdateInput!, $postId: ID!) {
    updatePost(criteria: $criteria, postId: $postId) {
      _id
      postTitle
      postText
      tags
      upvotes
    }
  }
`;

// Mutation to delete a post
export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

// Mutation to add a comment to a post
export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!, $postId: ID!) {
    addComment(commentText: $commentText, postId: $postId) {
      _id
      commentText
      author {
        _id
        username
      }
    }
  }
`;

// Mutation to update a comment
export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $commentText: String!) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      _id
      commentText
    }
  }
`;

// Mutation to delete a comment
export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;

// Mutation to upvote a post
export const UPVOTE_POST = gql`
  mutation upvotePost($postId: ID!) {
    upvotePost(postId: $postId) {
      _id
      upvotes
    }
  }
`;

// Mutation to downvote a post
export const DOWNVOTE_POST = gql`
  mutation downvotePost($postId: ID!) {
    downvotePost(postId: $postId) {
      _id
      downvotes
    }
  }
`;
*/
// Export all mutations as a single object (optional)
const mutations = {
  ADD_USER,
  LOGIN,
//   UPDATE_USER,
//   DELETE_USER,
//   ADMIN_DELETE_USER,
//   ADD_POST,
//   UPDATE_POST,
//   DELETE_POST,
//   ADD_COMMENT,
//   UPDATE_COMMENT,
//   DELETE_COMMENT,
//   UPVOTE_POST,
//   DOWNVOTE_POST
};

export default mutations; 