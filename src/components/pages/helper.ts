import { PostInfo } from '../../interface/postInfo';
import { ApolloCache } from '@apollo/client';
import { POSTS_ALL } from '../../client/query/postInfo';

export const addPostToCache = (cache: ApolloCache<any>, addPost: any) => {
    let allPosts: { posts: PostInfo[] }| null  = cache.readQuery({ query: POSTS_ALL });
    let posts = allPosts?.posts.slice();
    let index = posts?.findIndex((value: any) => value.id === addPost.id);
    if (index === undefined || index < 0){
      posts?.push(addPost);
      cache.writeQuery({
        query: POSTS_ALL,
        data: { 'posts': posts}
      });
    }
};

export const removePostFromCache = (cache: ApolloCache<any>, deletePost: any) => {
  let allPosts: { posts: PostInfo[] }| null  = cache.readQuery({ query: POSTS_ALL });
  let posts = allPosts?.posts.slice();
  let index = posts?.findIndex((value: any) => value.id === deletePost.id);
  if(index !== undefined && index !== -1){
    posts?.splice(index, 1);
    cache.writeQuery({
      query: POSTS_ALL,
      data: { 'posts': posts}
    });
  }
};