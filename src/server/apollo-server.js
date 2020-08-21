import { ApolloServer, gql } from 'apollo-server';
import { blogsData, blogCategories } from './data-source/blogs-data';

const typeDefs = gql`

  type Post {
    id: String,
    blogId: Int,
    postTitle: String,
    postText: String,
    blogCategory: String,
    postedBy: String,
    ownerId: Int
  }

  type BlogCategory {
    id: Int,
    name: String
  }

  type Query {
    postById(id: Int): [Post],
    posts: [Post],
    blogCategories: [BlogCategory]
  }

  type Mutation {
    deletePost(id: String): Post,
    addPost(post: PostInput): Post,
    updatePost(post: updateInput): Post
  }

  input PostInput {
    id: String
    blogId: Int,
    postTitle: String,
    postText: String,
    blogCategory: String,
    postedBy: String,
    ownerId: Int
  }

  input updateInput {
    id: String
    postTitle: String,
    postText: String
  }
`;

const resolvers = {
  Query: {
    postById(parent, args) { 
      console.log(parent);
      return  [blogsData.find((value) => value.id === args.id)] 
    },
    posts() { return  blogsData },
    blogCategories() { return blogCategories }
  },

  Mutation: {
    deletePost(parent,args) {
      const index = blogsData.findIndex((value) =>  value.id === args.id);
      const deletedPost = blogsData.splice(index, 1);
      return deletedPost[0];
    },
    addPost(parent,args) {
      blogsData.push(args.post);
      return args.post;
    },
    updatePost(parent,args){
      const inputData = args.post;
      const post = blogsData.find((value) => value.id === inputData.id);
      if (post != null) {
        post.postText = inputData.postText;
        post.postTitle = inputData.postTitle;
        return post;
      }
      return null;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

  