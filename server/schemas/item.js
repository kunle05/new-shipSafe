const { gql } = require('apollo-server-express');

const Item = gql`
  scalar Date

  type Item {
    _id: ID!
    packaging: String!
    length: String
    width: String
    height: String
    reference1: String
    reference2: String
    weight: Int!
    content: String!
    status: [Tracker!]
    destination: Location!
    delivered: Boolean!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    items: [Item]
    item: Item
  }
`;

module.exports = Item;
