import React from 'react';
import { Provider, useSelector } from 'react-redux';

import VoterFilters from './VoterFilters';
import VotersList from './VotersList';
import VoterInput from './VoterInput';
import store from './store';
import { getVoters, selectVotersCount } from './votersSlice';

import '../App.css';

store.dispatch(getVoters());

const Header = () => {
  const { total, voted } = useSelector(selectVotersCount);

  return (
    <h1>
      Vote Redux Toolkit! ({voted}/{total} already voted)
    </h1>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <VoterFilters />
        <VotersList />
        <VoterInput />
      </div>
    </Provider>
  );
};

export default App;
