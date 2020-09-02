export interface PostInfo {
    id: string,
    blogId: string,
    postTitle: string,
    postText: string,
    authorId: string,
    blog: BlogInfo,
    author?: AuthorInfo,
    comments: CommentInfo[],
};

export interface BlogInfo {
    id: string,
    name: string,
    posts?: PostInfo[],
    authorId: string
};

export interface AuthorInfo {
    id: string,
    name: string,
    about: string,
    blogs: BlogInfo[],
    posts: PostInfo[]
};

export interface CommentInfo {
    id: string,
    post_id: string,
    body: string,
    date: string,
    replies: ReplyInfo[]
};

export interface ReplyInfo {
    id: string,
    comment_id: string,
    body: string,
    date: string
};



