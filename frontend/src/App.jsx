import * as React from 'react';
import ReposList from './components/ReposList';
import RepoDetails from './components/RepoDetails';

const App = () => {
  return (
    <div className="App">
      <ReposList />
      <RepoDetails />
    </div>
  );
};

export default App;