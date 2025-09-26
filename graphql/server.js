const { ApolloServer, gql } = require("apollo-server-express");
const propertyService = require("../services/propertyService");

const typeDefs = gql`
  type Property {
    id: ID!
    title: String
    location: String
    price: Int
    bhk: Int
    type: String
    description: String
  }

  type PropertiesPage {
    total: Int
    page: Int
    limit: Int
    results: [Property]
  }

  type Query {
    properties(page: Int, limit: Int): PropertiesPage
    property(id: ID!): Property
    search(
      query: String
      bhk: Int
      location: String
      page: Int
      limit: Int
    ): PropertiesPage
  }
`;

const resolvers = {
  Query: {
    properties: (_, { page = 1, limit = 10 }) =>
      propertyService.getAllProperties(page, limit),
    property: (_, { id }) => propertyService.getPropertyById(id),
    search: (_, args) => propertyService.search(args),
  },
};

async function initGraphQL(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // enable schema browsing
    playground: true, // enable Apollo Playground UI
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  console.log("🚀 GraphQL endpoint ready at http://localhost:8000/graphql");
}

module.exports = { initGraphQL };
