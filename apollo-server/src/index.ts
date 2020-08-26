import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { resolvers, setPostsData } from './resolvers'

setPostsData();
const server = new ApolloServer({ typeDefs: schema, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

  