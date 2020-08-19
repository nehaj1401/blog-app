import { gql } from '@apollo/client';

export const POSTS_ALL =  gql`{
    posts {
        id,
        postId,
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