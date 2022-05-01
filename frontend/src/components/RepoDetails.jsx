import * as React from 'react';
import { gql, useQuery } from '@apollo/client';


const className = 'RepoDetails';
const GET_REPO = gql`
  query GetRepo($id: String!) {
    getRepoById(id: $id){
        size,
        name,
        private,
        owner {
          login
                id
          node_id
                avatar_url
                gravatar_id
                url
                html_url
          followers_url
          following_url
          gists_url
          starred_url
          subscriptions_url
          organizations_url
          repos_url
          events_url
                received_events_url
                type
                site_admin
        },
        files,
        content,
        hooks_url
    }
  }
`;

const RepoDetails = (props) => {
    const { id } = props.match.params;
    const { loading, error, data } = useQuery(GET_REPO, { variables: { id } });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const repo = data.getRepoById;

    return (
        <div className={className}>
        <code>{JSON.stringify(repo)}</code>
        </div>
    );
};

export default RepoDetails;