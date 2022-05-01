import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLScalarType } from 'graphql';

export type Owner = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
};

export type Repo = {
  name: string;
  size: number;
  owner: Owner;
  private?: boolean;
  hooks_url?: string;
};

export type FileTree = {
  path: string,
  mode: string,
  type: string,
  sha: string,
  size: number,
  url: string,
};

export type FileContent = {
  name: string,
  path: string,
  sha: string,
  size: number,
  url: string,
  html_url: string,
  git_url: string,
  download_url: string,
  type: string,
  content: string,
  encoding: string,
  _links: {
    self: string,
    git: string,
    html: string,
  }
};

export type GetReposResponse = Repo[];
export type GetMainRepoInfoResponse = Repo;
export type GetRepoFileContentResponse = FileContent;
export type GetRepoFilesResponse = {
  sha: string,
  url: string,
  truncated: boolean,
  tree: FileTree[],
}

const RepoOwnerType = new GraphQLObjectType({
  name: "RepoOwnerType",
  fields: () => ({
    login: { type: GraphQLString },
    id: { type: GraphQLInt },
    node_id: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    gravatar_id: { type: GraphQLString },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    followers_url: { type: GraphQLString },
    following_url: { type: GraphQLString },
    gists_url: { type: GraphQLString },
    starred_url: { type: GraphQLString },
    subscriptions_url: { type: GraphQLString },
    organizations_url: { type: GraphQLString },
    repos_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    received_events_url: { type: GraphQLString },
    type: { type: GraphQLString },
    site_admin: { type: GraphQLString },
  }),
});

export const RepoType = new GraphQLObjectType({
  name: "ReposType",
  fields: () => ({
    size: { type: GraphQLInt },
    name: { type: GraphQLString },
    owner: { type: RepoOwnerType },
  }),
});

export const RepoDetailsType = new GraphQLObjectType({
  name: "RepoDetailsType",
  fields: () => ({
    size: { type: GraphQLInt },
    name: { type: GraphQLString },
    owner: { type: RepoOwnerType },
    private: { type: GraphQLBoolean },
    files: { type: GraphQLInt },
    content: { type: GraphQLString },
    hooks_url: { type: GraphQLString },
  }),
});