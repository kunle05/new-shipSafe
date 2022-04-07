const { gql } = require('apollo-server-express');

const Employee = gql`
  scalar Date

  enum Status {
    ACTIVE
    INACTIVE
  }

  enum Permission {
    USER
    MANAGER
    ADMIN
  }

  type Employee {
    _id: ID!
    employee_ID: String!
    firstname: String!
    lastname: String!
    photo: String
    username: String!
    email: String!
    location: Location!
    status: Status!
    permissions: [Permission!]
    lastLogin: Date
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    me: Employee
    employee(_id: ID!): Employee
    employees(location: ID!, skip: Int, limit: Int): [Employee]
  }
`;

module.exports = Employee;
