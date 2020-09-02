import { AuthorInfo } from "../interface/postInfo";
import { getAuthorBlogs } from "./blogResolver";
import axios from 'axios';
import { BASE_URL } from "../constants";
import { getPostsByAuthorId } from "./postsResolver";

const getAuthors = async () => {
    const response = await axios.get(`${BASE_URL}authors`);
    // console.log(response.data);
    return response.data;
};

export const getAllAuthors = async() => {
    const authors = await getAuthors();
    return appendAuthorInfo(authors);
};

const appendAuthorInfo = (authors: AuthorInfo[]) => {
    return authors.map(async (author: AuthorInfo) => {
        author.blogs = await getAuthorBlogs(author.id);
        author.posts = await getPostsByAuthorId(author.id);
        console.log(author);
        return author;
    });
};

export const getAuthorInfoForPost = async (authorId: string) => {
    const authors = await getAuthors();
    return authors.find((author: AuthorInfo) => authorId === author.id);
};
