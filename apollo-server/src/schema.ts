import { gql } from "apollo-server";

export const schema = gql`

  type Post {
    id: String,
    blogId: String,
    postTitle: String,
    postText: String,
    authorId: String,
    author: Author,
    comments: [Comment],
    blog: Blog
  }

  type Blog {
    id: String,
    name: String,
    posts: [Post],
    authorId: String
  }

  type Author {
    id: String,
    name: String,
    about: String,
    blogs: [Blog],
    posts: [Post]
  }

  type Comment {
    id: String,
    post_id: String,
    body: String,
    date: String,
    replies:[Reply]
  }

  type Reply {
    id: String, 
    comment_id: String,
    body: String,
    date: String
  }

  type Query {
    posts: [Post],
    authorBlogs(authorId: String): [Blog],
    authors: [Author],
    blogs: [Blog],
    postsByBlogId(blogId: String): [Post]
  }

  type Mutation {
    deletePost(id: String): String,
    addPost(post: PostInput): Post,
    updatePost(post: PostInput): Post,
    addComment(comment: CommentInput): Comment,
    deleteComment(id: String): String,
    addBlog(blog: BlogInput): Blog,
    addReplyToAComment(reply: ReplyInput): Reply
  }

  input PostInput {
    id: String
    blogId: String,
    postTitle: String,
    postText: String,
    authorId: String
  }

  input CommentInput {
    id: String,
    post_id: String,
    body: String,
    date: String
  }

  input BlogInput {
    id: String,
    name: String,
    authorId: String
  }

  input ReplyInput {
    id: String, 
    comment_id: String,
    body: String,
    date: String
  }
`;