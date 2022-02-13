import { VoteFilter } from './filterStore';
import useStores from './useStores';
import { observer } from 'mobx-react-lite';
import { trace } from 'mobx';

const VotersList = () => {
  trace();
  const { votersStore } = useStores();

  const onChangeVote = (voterId, newVote) => {
    votersStore.patchVoter(voterId, newVote);
  };

  return (
    <div className="magenta-border">
      <h2>Voters List</h2>
      {votersStore.status === 'loading' && <div>Loading...</div>}
      <ul>
        {votersStore.filteredVoters.map((voter) => (
          <li key={voter.id}>
            <span style={{ fontWeight: 'bold' }}>{voter.name} -</span>
            <span>
              <label>
                <input
                  type="radio"
                  value={VoteFilter.LoveIt}
                  name={`voter-${voter.id}`}
                  checked={voter.vote === VoteFilter.LoveIt}
                  onChange={() => onChangeVote(voter.id, VoteFilter.LoveIt)}
                />
                Love It
              </label>
              <label>
                <input
                  type="radio"
                  value={VoteFilter.HateIt}
                  name={`voter-${voter.id}`}
                  checked={voter.vote === VoteFilter.HateIt}
                  onChange={() => onChangeVote(voter.id, VoteFilter.HateIt)}
                />
                Hate It
              </label>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// This way of observer allows us to preserve the name
export default observer(VotersList);
