import { gql } from "apollo-server";

export const schema = gql`

  type Post {
    id: String,
    blogId: Int,
    postTitle: String,
    postText: String,
    blogCategory: String,
    postedBy: String,
    ownerId: String
  }

  type BlogCategory {
    id: Int,
    name: String
  }

  type Author {
    id: String,
    name: String
  }

  type Query {
    postById(id: Int): [Post],
    posts: [Post],
    blogCategories: [BlogCategory],
    authors: [Author]
  }

  type Mutation {
    deletePost(id: String): Post,
    addPost(post: PostInput): Post,
    updatePost(post: updateInput): Post
  }

  input PostInput {
    id: String
    blogId: Int,
    postTitle: String,
    postText: String,
    blogCategory: String,
    postedBy: String,
    ownerId: String
  }

  input updateInput {
    id: String
    postTitle: String,
    postText: String
  }
`;