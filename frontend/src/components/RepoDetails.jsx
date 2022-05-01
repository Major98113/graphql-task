import * as React from 'react';
import { gql, useQuery } from '@apollo/client';


const className = 'RepoDetails';
const GET_REPO = gql`
  query GetRepo($id: String!) {
    getRepoById(id: $id){
      size,
      name,
      private
    }
  }
`;

const RepoDetails = ({ data }) => {
    const { loading, error, data:response } = useQuery(GET_REPO, { variables: { id: 'benchmark' } });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(response);

    return (
        <div className={className}>
        <pre>{JSON.stringify(data)}</pre>
        </div>
    );
};

export default RepoDetails;