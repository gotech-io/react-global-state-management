import { createContext, useContext } from 'react';
import RootStore from './store';

const rootStore = new RootStore();

const context = createContext({
  votersStore: rootStore.votersStore,
  filterStore: rootStore.filterStore,
});

const useStores = () => useContext(context);
rootStore.votersStore.getVoters();

export default useStores;
