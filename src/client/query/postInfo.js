import { gql } from '@apollo/client';

export const POSTS_ALL =  gql`{
    posts {
        id,
        blogId,
        postTitle,
        postText,
        blogCategory,
        postedBy,
        ownerId
    }
}`;

export const BLOG_CATEGORIES =  gql`{
    blogCategories {
        id,
       name
    }
}`;

export const DELETE_POST = gql`
  mutation DeletePost($id: String) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: PostInput) {
    addPost(post: $post) {
      id,
      blogId,
      postTitle,
      postText,
      blogCategory,
      postedBy,
      ownerId
    }
  }
`;
export const UPDATE_POST = gql`
  mutation UpdatePost($post: updateInput) {
    updatePost(post: $post) {
      id,
      postTitle,
      postText
    }
  }
`;