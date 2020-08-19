export interface PostInfo {
    postId: Number,
    blogId: Number,
    postTitle: string,
    postText: string,
    blogCategory: string
    postedBy: string,
    ownerId: Number
};

export interface BlogInfo {
    id: Number,
    name: string
};
