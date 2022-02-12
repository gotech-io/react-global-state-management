import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewVoter } from './votersSlice';

const VoterInput = () => {
  const [disabled, setDisabled] = useState(false);
  const [voterName, setVoterName] = useState('');
  const dispatch = useDispatch();

  const onClick = async () => {
    setDisabled(true);
    await dispatch(postNewVoter(voterName));
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

export default VoterInput;
