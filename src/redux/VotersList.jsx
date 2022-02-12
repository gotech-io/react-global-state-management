import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredVoters } from './votersSlice';
import { VoteFilter } from './filterSlice';
import { patchVoter } from './votersSlice';

const VotersList = () => {
  const loadingStatus = useSelector((state) => state.voters.status);
  const voters = useSelector(selectFilteredVoters);
  const dispatch = useDispatch();

  const onChangeVote = (voterId, newVote) => {
    dispatch(patchVoter(voterId, newVote));
  };

  return (
    <div className="magenta-border">
      <h2>Voters List</h2>
      {loadingStatus === 'loading' && <div>Loading...</div>}
      <ul>
        {voters.map((voter) => (
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

export default VotersList;
