import VotersStore from './votersStore';
import FilterStore from './filterStore';

class RootStore {
  constructor() {
    this.votersStore = new VotersStore(this);
    this.filterStore = new FilterStore(this);
  }
}

export default RootStore;
