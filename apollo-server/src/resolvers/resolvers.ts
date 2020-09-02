import { getAllPosts, getPostsByBlogId, addPost, deletePost, updatePost } from './postsResolver';
import { getAllAuthors } from './authorsResolver';
import { getAuthorBlogs, addABlog, getBlogs } from './blogResolver';
import { CommentInfo, BlogInfo, ReplyInfo } from '../interface/postInfo';
import { addCommentToAPost, deleteComment, addReplyToAComment } from './commentsResolver';

export const resolvers = {
  Query: {
    posts: () => getAllPosts(),
    blogs: async () => await getBlogs(),
    authorBlogs: (_: any, args: { authorId: string }) => getAuthorBlogs(args.authorId),
    authors: () => getAllAuthors() ,
    postsByBlogId: (_: any, args: { blogId: string }) => getPostsByBlogId(args.blogId)
  },

  Mutation: {
    deletePost: (_: any, args: { id: string })  => deletePost(args.id),
    addPost: (parent: any, args: any) => addPost(args.post),
    updatePost: (parent: any, args: any) =>{ console.log(args.post); return updatePost(args.post)},
    addComment: (_: any, args: { comment: CommentInfo })  => addCommentToAPost(args.comment),
    deleteComment: (_: any, args: { id: string })  => deleteComment(args.id),
    addBlog: (_: any, args: { blog: BlogInfo })  => addABlog(args.blog),
    addReplyToAComment: (_: any, args: { reply: ReplyInfo })  => addReplyToAComment(args.reply)
  }
};
