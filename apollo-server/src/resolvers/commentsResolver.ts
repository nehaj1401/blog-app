import axios from 'axios';
import { BASE_URL } from '../constants';
import { CommentInfo, ReplyInfo } from '../interface/postInfo';

export const getCommentsForPost = async (postId: string) => {
    const comments = await getComments();
    return comments.filter((comment: any) => 
        comment.post_id === postId
    );
};

const getComments = async () => {
    try {
        const response = await axios.get(`${BASE_URL}comments`);
        return response.data;
    } catch (err) {
        throw err;
    }
    
};

/// Mutations ///
export const addCommentToAPost = async (comment: CommentInfo) => {
    try{
        const response = await axios.post(`${BASE_URL}comments`, comment);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? comment : null;
    } catch (err) {
        throw err;
    }
};

export const deleteComment = async (id: string) => {
    try{
        const response = await axios.delete(`${BASE_URL}comments/${id}`);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? id : null;
    } catch (err) {
        throw err;
    }
};

export const addReplyToAComment = async (reply: ReplyInfo) => {
    try{
        const response = await axios.post(`${BASE_URL}comments/reply`, reply);
        console.log(response.data);
        const success = response.data.success;
        return (success == true) ? reply : null;
    } catch (err) {
        throw err;
    }
};
