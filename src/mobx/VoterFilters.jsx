import useStores from './useStores';
import { VoteFilter } from './filterStore';
import { observer } from 'mobx-react-lite';
import { trace } from 'mobx';

const VoterFilters = () => {
  trace();
  const { filterStore } = useStores();
  const onChangeValue = (e) => {
    filterStore.voteFilterChanged(e.target.value);
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
            checked={filterStore.status === VoteFilter.All}
            onChange={onChangeValue}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.LoveIt}
            name="voter-filter"
            checked={filterStore.status === VoteFilter.LoveIt}
            onChange={onChangeValue}
          />
          Love It
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.HateIt}
            name="voter-filter"
            checked={filterStore.status === VoteFilter.HateIt}
            onChange={onChangeValue}
          />
          Hate It
        </label>
        <label>
          <input
            type="radio"
            value={VoteFilter.NotVoted}
            name="voter-filter"
            checked={filterStore.status === VoteFilter.NotVoted}
            onChange={onChangeValue}
          />
          Not Voted
        </label>
      </div>
    </div>
  );
};

export default observer(VoterFilters);
