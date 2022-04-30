import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } from 'graphql';
const ReposType = require('../types/repos.types');

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllRepos: {
      type: new GraphQLList(ReposType),
      args: {},
      resolve(_parent, _args) {
        return [];
      },
    },
    getRepoById: {
        type: new GraphQLList(ReposType),
        args: { id: { type: GraphQLString } },
        resolve(_parent, _args) {
            console.log('-----------------------------------');
        console.log(`_args: ${JSON.stringify(_args)}`);
        console.log('-----------------------------------');
          return {
              'id': '111'
          };
        },
      },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });