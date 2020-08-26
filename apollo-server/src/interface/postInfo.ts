export interface PostInfo {
    id: string,
    blogId: Number,
    postTitle: string,
    postText: string,
    blogCategory: string
    postedBy: string,
    ownerId: string
};

export interface BlogInfo {
    id: Number,
    name: string
};

export interface AuthorInfo {
    id: string,
    name: string
};

