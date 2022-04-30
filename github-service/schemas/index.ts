import 'reflect-metadata';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } from 'graphql';
import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { ReposService } from '../services/repos.service';
import { RepoDetailsType, RepoType } from '../types/repos.types';

const reposServiceInstance = new ReposService();
const logger = serviceContainer.get<LoggerInterface>( Logger );
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllRepos: {
      type: new GraphQLList(RepoType),
      args: {},
      async resolve(_parent, _args) {
        logger.logServiceRequest('RootQuery getAllRepos request started');
        const repos = await reposServiceInstance.getAllRepos();
        logger.logServiceRequest(`RootQuery getAllRepos repos: ${JSON.stringify(repos)}`);
        return repos;
      },
    },
    getRepoById: {
        type: RepoDetailsType,
        args: { id: { type: GraphQLString } },
        async resolve(_parent, args) {
          logger.logServiceRequest('RootQuery getRepoById request started');
          const { id } = args;
          logger.logServiceRequest(`RootQuery getRepoById id: ${id}`);
          const desiredRepo = await reposServiceInstance.getRepoById(id);
          logger.logServiceRequest(`RootQuery getRepoById desiredRepo: ${JSON.stringify(desiredRepo)}`);
          return desiredRepo;
        },
      },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });