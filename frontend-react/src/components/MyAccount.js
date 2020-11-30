import React from 'react';

export function MyAccount({
  address, 
  setAddress, 
  tokenBalance, 
  loadTokenBalance 
}) {
  return (
    <section>
      <h4>My Account</h4>
      <label>
        <span>My Address:</span>
        <input type="text" placeholder="0x9ab5" value={address} 
          onChange={event => setAddress(event.target.value)} />
      </label>
      <button className="button" onClick={loadTokenBalance}>Get Balance</button>
      <div>
        <span>My Balance:</span>
        <span>{tokenBalance}</span>
      </div>
    </section>
  );
}
