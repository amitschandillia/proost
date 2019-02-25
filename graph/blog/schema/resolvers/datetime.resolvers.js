const { GraphQLScalarType } = require('graphql/type');

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date/Time custom scalar type',
  // Runs on mutation
  parseValue: value => value,
  // Runs on query
  serialize: value => new Date(value.getTime()),
  parseLiteral(ast) {
    // ast value is always in string format
    return ast.value;
  },
});

module.exports = { DateTime };
