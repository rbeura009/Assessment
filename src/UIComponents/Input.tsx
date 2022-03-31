import React from 'react';

function Input({ type, changeHandler }: { type: string; changeHandler: () => {} }) {
  return <input className="input" data-testid="input" type={type || 'text'} onChange={changeHandler}></input>;
}

export default Input;
