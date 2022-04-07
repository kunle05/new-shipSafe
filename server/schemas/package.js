const { gql } = require('apollo-server-express');

const Package = gql`
  scalar Date

  enum Payer {
    shipper
    receiver
  }

  type Package {
    _id: ID!
    shipper_name: String!
    shipper_phone: String!
    shipper_email: String
    recipient_name: String!
    recipient_phone: String!
    recipient_email: String
    origin: Location!
    destination: Location!
    next_stop: Location
    amount: Int!
    bill_to: Payer!
    amount_paid: Int!
    tracking: String!
    items: [Item]
    status: Action!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    packages(origin: ID, destination: ID, name: String, date: Date): [Package]
    package(_id: ID!): Package
    track(number: String!): Package
  }
`;

module.exports = Package;
