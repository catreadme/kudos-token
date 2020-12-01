import React from 'react';

export function Allowance({ 
  ownerAddress, 
  setOwnerAddress, 
  spenderAddress, 
  setSpenderAddress, 
  allowance, 
  loadAllowance
}) {
  const getAllowance = () => {
    if (ownerAddress === '') {
      alert('Enter an "Owner Address"');
      return;
    }

    if (spenderAddress === '') {
      alert('Enter a "Spender Address"');
      return;
    }

    loadAllowance();
  }

  return (
    <section>
      <h4>Allowance</h4>
      <label>
        <span>Owner Address:</span>
        <input type="text" placeholder="0x6c1a..." value={ownerAddress} 
          onChange={event => setOwnerAddress(event.target.value)} />
      </label>
      <label>
        <span>Spender Address:</span>
        <input type="text" placeholder="0x6c1a..." value={spenderAddress} 
          onChange={event => setSpenderAddress(event.target.value)} />
      </label>
      <button className="button" onClick={getAllowance}>Get Allowance</button>
      <div>
        <span>Allowance:</span>
        <span>{allowance}</span>
      </div>
    </section>
  );
}