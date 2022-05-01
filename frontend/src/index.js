import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReposList from './components/ReposList';
import RepoDetails from './components/RepoDetails';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ReposList} />
        <Route path='/repos/:id' component={RepoDetails} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);