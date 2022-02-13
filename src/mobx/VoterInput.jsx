import { useState } from 'react';
import useStores from './useStores';
import { observer } from 'mobx-react-lite';
import { trace } from 'mobx';

const VoterInput = () => {
  trace();
  const [disabled, setDisabled] = useState(false);
  const [voterName, setVoterName] = useState('');
  const { votersStore } = useStores();

  const onClick = async () => {
    setDisabled(true);
    await votersStore.postNewVoter(voterName);
    setDisabled(false);
    setVoterName('');
  };

  return (
    <div className="cyan-border">
      <h3>Add a voter:</h3>
      <input
        type="text"
        value={voterName}
        disabled={disabled}
        onChange={(e) => setVoterName(e.target.value.trim())}
      />
      <button onClick={onClick} disabled={disabled || voterName === ''}>
        Add
      </button>
    </div>
  );
};

export default observer(VoterInput);
