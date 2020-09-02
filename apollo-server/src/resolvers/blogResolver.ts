import { BlogInfo } from "../interface/postInfo";
import { getPostsByBlogId } from "./postsResolver";
import axios from "axios";
import { BASE_URL } from "../constants";

export const getAuthorBlogs = async (authorId: string) => {
    const blogs = await getBlogs();
    return blogs.filter( (blog: any) => {
        if (blog.authorId === authorId) {
            blog.posts =  getPostsByBlogId(blog.id);
            return true;
        }
        return false;
    } );
};


export const getBlogs = async () => {
    const response = await axios.get(`${BASE_URL}blogs`);
    return response.data;
};

export const getBlogInfoById = async (blogId: string) => {
    const blogs = await getBlogs();
    return blogs.find( (blog: any) => blogId === blog.id);
};

/// Mutations ///
export const addABlog = async (blog: BlogInfo) => {
    try{
        const response = await axios.post(`${BASE_URL}blogs`, blog);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? blog : null;
    } catch (err) {
        throw err;
    }
};

