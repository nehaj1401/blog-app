import { PostInfo } from "../interface/postInfo";
import { getAuthorInfoForPost } from "./authorsResolver";
import { getCommentsForPost } from "./commentsResolver";
import axios from 'axios';
import { BASE_URL } from "../constants";
import { getBlogInfoById } from "./blogResolver";

const getPosts = async () => {
    try{
        const response = await axios.get(`${BASE_URL}posts`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getAllPosts = async () => {
    const posts = await getPosts();
    const finalPosts = posts.map(async (post: PostInfo) => {
        const authorId = post.authorId;
        post.author = await getAuthorInfoForPost(authorId);
        post.comments = await getCommentsForPost(post.id);
        post.blog = await getBlogInfoById(post.blogId);
        console.log(post);
        return post;
    });
    return finalPosts;
};

export const getPostsByBlogId = async (blogId: string) => {
    const posts = await getPosts();
    const filteredPosts =  posts.filter( (post: any) =>{ 
        if (post.blogId === blogId) {
            console.log(`inside getPostsByBlogId ${blogId}`);
            post.author =  getAuthorInfoForPost(post.authorId);
            post.comments =  getCommentsForPost(post.id);
            return true;
        }
        return false;
    });
    console.log(filteredPosts);
    return filteredPosts;
};

export const getPostsByAuthorId = async (authorId: string) => {
    const posts = await getPosts();
    const filteredPosts =  posts.filter( (post: any) =>{ 
        if (post.authorId === authorId) {
            post.comments =  getCommentsForPost(post.id);
            return true;
        }
        return false;
    });
    console.log(filteredPosts);
    return filteredPosts;
};

export const getPostsById = async (id: string) => {
    const posts = await getPosts();
    return posts.find(async (post: PostInfo) =>{ 
        if (post.id === id) {
            post.author = await getAuthorInfoForPost(post.authorId);
            post.comments = await getCommentsForPost(post.id);
            return true;
        }
        return false;
    })
};

/// Mutations///
export const addPost = async (post: PostInfo) => {
    try{
        console.log(`inside add Post`);
        const response = await axios.post(`${BASE_URL}posts`, post);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? post : null;
    } catch (err) {
        throw err;
    }
};

export const updatePost = async (post: PostInfo) => {
    try{
        console.log('Inside updatePost');
        console.log(post);
        const response = await axios.put(`${BASE_URL}posts`, post);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? post : null;
    } catch (err) {
        throw err;
    }
};

export const deletePost = async (id: string) => {
    try{
        const response = await axios.delete(`${BASE_URL}posts/${id}`);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? id : null;
    } catch (err) {
        throw err;
    }
};

