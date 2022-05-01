import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

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

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const repos = response.getAllRepos;

    return (
        <div className={className}>
            <h3>Repos</h3>
            <ol>
                {repos.map(({name, owner, size}) =>
                    <li key={name}>
                        <Link to={`/repos/${name}`}>{name}</Link> : {owner.login}
                    </li>
                )}
            </ol>
        </div>
    );
};

export default ReposList;