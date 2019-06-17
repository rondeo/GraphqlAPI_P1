const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');
const fs = require("fs");
const path = require("path");


// Reading schema file
let typeDefs = "";

typeDefs += fs.readFileSync(path.join(__dirname, "./schemas/directives.gql"), {
  encoding: "utf8"
});
typeDefs += "\n" + fs.readFileSync(path.join(__dirname, "./schemas/types.gql"), {
  encoding: "utf8"
});
typeDefs += "\n" + fs.readFileSync(path.join(__dirname, "./schemas/query.gql"), {
  encoding: "utf8"
});
typeDefs += "\n" + fs.readFileSync(path.join(__dirname, "./schemas/mutations.gql"), {
  encoding: "utf8"
});


let schemaDirectives = {
  from: require("./directives/from")
}


// Generate the schema object from shema file and definition.
module.exports = makeExecutableSchema({typeDefs, resolvers, schemaDirectives});
