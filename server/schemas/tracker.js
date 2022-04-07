const { gql } = require('apollo-server-express');

const Tracker = gql`
  scalar Date

  enum Action {
    shipped
    received
    delayed
    onHold
    delivered
  }

  type Tracker {
    _id: ID!
    action: Action!
    agent: Employee!
    location: Location!
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = Tracker;
