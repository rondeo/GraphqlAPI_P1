const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Query {
    settings: [Setting!]!
    savedSettings: [Setting!]!
    state: String!
  }

  type Mutation {
    commit: Boolean
    assert(settings: [ISetting]): [Setting]!
  }

  type Setting {
    name: String!
    value: String
  }

  input ISetting {
    name: String!
    value: String
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});
