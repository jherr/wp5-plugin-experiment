import loadPlugins from "mf-plugins";
import { ApolloServer, gql } from "apollo-server";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const typeDefs = gql`
  type ServerInfo {
    version: String!
  }
  type Query {
    info: ServerInfo
  }
`;

const resolvers = {
  Query: {
    info: () => ({
      version: "1.0.0",
    }),
  },
};

const start = async () => {
  const plugins = await loadPlugins("../plugins");

  const typeDefsArray = [typeDefs];
  const resolversArray = [resolvers];
  plugins.forEach((plugin) => {
    typeDefsArray.push(gql(plugin.typeDefs));
    resolversArray.push(plugin.resolvers);
  });

  const server = new ApolloServer({
    typeDefs: mergeTypes(typeDefsArray),
    resolvers: mergeResolvers(resolversArray),
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
