import { useSelector, useDispatch } from 'react-redux';
import { VoteFilter, voteFilterChanged, selectFilters } from './filterSlice';

const VoterFilters = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const onChangeValue = (e) => {
    dispatch(voteFilterChanged(e.target.value));
  };

  return (
    <div className="yellow-border">
      <h3>Voter Filter:</h3>
      <div>
        <label>
          <input
            type="radio"
            value={VoteFilter.All}
            name="voter-filter"
            checked={filters.status === VoteFilter.All}
            onChange={onChangeValue}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.LoveIt}
            name="voter-filter"
            checked={filters.status === VoteFilter.LoveIt}
            onChange={onChangeValue}
          />
          Love It
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.HateIt}
            name="voter-filter"
            checked={filters.status === VoteFilter.HateIt}
            onChange={onChangeValue}
          />
          Hate It
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.NotVoted}
            name="voter-filter"
            checked={filters.status === VoteFilter.NotVoted}
            onChange={onChangeValue}
          />
          Not Voted
        </label>
      </div>
    </div>
  );
};

export default VoterFilters;
