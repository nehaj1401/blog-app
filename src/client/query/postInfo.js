import { gql } from '@apollo/client';

export const POSTS_ALL =  gql`{
    posts {
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
