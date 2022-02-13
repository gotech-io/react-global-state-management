import { makeAutoObservable } from 'mobx';

const VoteFilter = {
  All: 'ALL',
  LoveIt: 'LOVE_IT',
  HateIt: 'HATE_IT',
  NotVoted: 'NOT_VOTED',
};

class FilterStore {
  rootStore;
  status = VoteFilter.All;

  constructor(rootStore) {
    // Notice that makeAutoObservable does not autobind by default, so destructuring will not work
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  voteFilterChanged(status) {
    this.status = status;
  }
}

export { VoteFilter };
export default FilterStore;
