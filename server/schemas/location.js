const { gql } = require('apollo-server-express');

const Location = gql`
  scalar Date

  type Location {
    _id: ID!
    street: String!
    city: String
    state: String!
    country: String!
    photo: String
    name: String
    description: String
    phone: String
    email: String
    status: Status!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    location(_id: ID!): Location
    locations(status: Status, state: String, country: String, skip: Int, limit: Int): [Location]
  }
`;

module.exports = Location;
