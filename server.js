const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const port = 8000;

const typeDefs = require('./server/schemas')();

const resolvers = {
  // Query: require('./server/resolvers/queries')(),
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, path: '/' });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  console.log(`Server listening on port ${port + server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
