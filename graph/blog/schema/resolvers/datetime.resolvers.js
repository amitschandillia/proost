const { GraphQLScalarType } = require('graphql/type');

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date/Time custom scalar type',
  parseValue: (value) => { // runs on mutation
    return value;
  },
  serialize: (value) => { // runs on query
    return new Date(value.getTime());
  },
  parseLiteral(ast) {
    return ast.value; // ast value is always in string format
  },
});

module.exports = {DateTime};
