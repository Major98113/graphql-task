import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

const className = 'ReposList';
const GET_ALL_REPOS = gql`
  query GetAllRepos {
    getAllRepos {
      name,
      owner {
        login,
        url,
        type
      }
      size
    }
  } 
`;

const ReposList = ({ data }) => {
    const { loading, error, data:response } = useQuery(GET_ALL_REPOS);
    console.log(response);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div className={className}>
            <h3>Repos</h3>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    );
};

export default ReposList;