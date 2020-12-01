import React from 'react';

export function Balance({
  address, 
  balance, 
  loadBalance 
}) {
  return (
    <section>
      <h4>Balance</h4>
      <label>
        <span>My Address:</span>
        <input type="text" placeholder="0x9ab5" defaultValue={address} readOnly />
      </label>
      <button className="button" onClick={loadBalance}>Get Balance</button>
      <div>
        <span>My Balance:</span>
        <span>{balance}</span>
      </div>
    </section>
  );
}
