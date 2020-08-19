import { ApolloServer, gql } from 'apollo-server';
import { blogsData, blogCategories } from './data-source/blogs-data';

const typeDefs = gql`

  type Post {
    id: String,
    postId: Int,
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
    addPost(post: PostInput): Post
  }

  input PostInput {
    postId: Int,
    blogId: Int,
    postTitle: String,
    postText: String,
    blogCategory: String,
    postedBy: String,
    ownerId: Int
  }
  
`;

  const resolvers = {
    Query: {
      postById(parent, args) { 
        console.log(parent);
        return  [blogsData.find((value) => value.postId === args.postId)] 
      },
      posts() { return  blogsData },
      blogCategories() { return blogCategories }
    },

    Mutation: {
      deletePost(parent,args) {
        const index = blogsData.findIndex((value) =>  value.id === args.id);
        const deletedPost = blogsData.splice(index, 1);
        return deletedPost;
      },
      addPost(parent,args) {
        blogsData.push(args.post);
        return args.post;
      }
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });

