import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function InputComponent() {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      history.push('/other');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="食べ物で検索"
        value={inputValue}
        onChange={handleChange}
        className="home-search-field input"
      />
    </form>
  );
}

export default InputComponent;