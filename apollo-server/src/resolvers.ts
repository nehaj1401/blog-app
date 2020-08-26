import fs from 'fs';
import util from 'util'; 
import { PostInfo, AuthorInfo, BlogInfo } from './interface/postInfo';

let blogsData: { posts: PostInfo[], authors: AuthorInfo[], blogCategories: BlogInfo[] },
postsData: PostInfo[], authors: AuthorInfo[], blogCategories: BlogInfo[];

export const setPostsData = async () => {
  const readFile = util.promisify(fs.readFile);
  try {
    console.log('Inside getPostsData');
    blogsData = JSON.parse(await readFile('./data-source/posts.json', 'utf8'));
    console.log(blogsData);
    postsData = blogsData?.posts;
    authors = blogsData?.authors;
    blogCategories = blogsData?.blogCategories;
  } catch (err) {
    throw err;
  }
};

const updatePostsData = async (data: any) => {
  const writeFile = util.promisify(fs.writeFile);
  try {
    console.log(JSON.stringify(data));
    await writeFile('./data-source/posts.json', JSON.stringify(data));
    return true;
  } catch (err) {
    throw err;
  }
};
    
export const resolvers = {
  Query: {
    postById(_: any, args: any) { 
      return  [postsData?.find((value: any) => value.id === args.id)] 
    },
    posts() { return postsData },
    blogCategories() { return blogCategories },
    authors() { return authors }
  },

  Mutation: {
    async deletePost(_: any,args: any) {
      const index = postsData.findIndex((value: any) =>  value.id === args.id);
      const deletedPost = postsData.splice(index, 1);
      const success: boolean = await updatePostsData(blogsData);
      return (success) ? deletedPost[0] : null;
    },

    async addPost(parent: any, args: any) {
      const newPost = args.post;
      postsData.push(newPost);
      console.log(args);
      const success: boolean = await updatePostsData(blogsData);
      return (success) ? newPost : null;
    },

    async updatePost(_: any, args: any){
      const inputData = args.post;
      const post = postsData.find((value: any) => value.id === inputData.id);
      if (post !== null) {
        post!.postText = inputData.postText;
        post!.postTitle = inputData.postTitle;
        const success: boolean = await updatePostsData(blogsData);
        return (success) ? post : null;
      }
      return null;
    }
  }
};