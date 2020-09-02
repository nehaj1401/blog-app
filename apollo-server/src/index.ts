import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { resolvers } from './resolvers/resolvers'

const server = new ApolloServer({ typeDefs: schema, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

  