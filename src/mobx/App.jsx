import React from 'react';
import { observer } from 'mobx-react-lite';
import VoterFilters from './VoterFilters';
import VotersList from './VotersList';
import VoterInput from './VoterInput';

import '../App.css';
import useStores from './useStores';

const Header = observer(function Header() {
  const { votersStore } = useStores();
  const { voted, total } = votersStore.voterCount;

  return (
    <h1>
      Vote MobX! ({voted}/{total} already voted)
    </h1>
  );
});

const App = () => {
  return (
    <div className="App">
      <Header />
      <VoterFilters />
      <VotersList />
      <VoterInput />
    </div>
  );
};

export default App;
