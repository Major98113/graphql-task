import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';


const RepoType = new GraphQLObjectType({
  name: "ReposType",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    full_name: { type: GraphQLString },
    html_url: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

module.exports = RepoType;