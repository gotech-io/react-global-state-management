import { VoteFilter } from './filterStore';
import { makeAutoObservable, runInAction, trace, action } from 'mobx';

class VotersStore {
  rootStore;
  status = 'idle';
  voters = [];

  constructor(rootStore) {
    // Notice that makeAutoObservable does not autobind by default, so destructuring will not work
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
  }

  async getVoters() {
    this.status = 'loading';
    const response = await fetch('http://localhost:3001/voters');
    const voters = await response.json();

    // this creates a transaction for data changes
    action('getVoters', () => {
      this.voters.push(...voters);
      this.status = 'done';
    })();
  }

  async postNewVoter(name) {
    const newVoter = { name, vote: null };
    const response = await fetch('http://localhost:3001/voters', {
      method: 'POST',
      body: JSON.stringify(newVoter),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const voter = await response.json();

    runInAction(() => {
      this.voters.push(voter);
    });
  }

  async patchVoter(id, vote) {
    const response = await fetch(`http://localhost:3001/voters/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ vote }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const voter = await response.json();

    runInAction(() => {
      const foundVoter = this.voters.filter((voter) => voter.id === id)[0];
      Object.assign(foundVoter, voter); // this is to update all properties of the voter
      // splicing the array could have worked as well
    });
  }

  get voterCount() {
    trace(); // this is a small util to log reaction
    const total = this.voters.length;
    const voted = this.voters.filter((voter) => voter.vote).length;
    return { total, voted };
  }

  get filteredVoters() {
    trace();
    const status = this.rootStore.filterStore.status;
    if (status === VoteFilter.All) {
      return this.voters;
    }

    if (status === VoteFilter.NotVoted) {
      return this.voters.filter((voter) => !voter.vote);
    }

    return this.voters.filter((voter) => voter.vote === status);
  }
}

export default VotersStore;
