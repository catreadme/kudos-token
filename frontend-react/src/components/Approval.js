import React from 'react';

export function Approval({ 
  address, 
  setAddress, 
  amount, 
  setAmount, 
  transactionStatus,
  approveTokens
}) {
  return (
    <section>
      <h4>Approve</h4>
      <label>
        <span>Approve Amount:</span>
        <input type="number" step="1" min="1" placeholder="5" value={amount} 
          onChange={event => setAmount(event.target.value)} />
      </label>
      <label>
        <span>For Address:</span>
        <input type="text" placeholder="0x6c1a..." value={address} 
          onChange={event => setAddress(event.target.value)} />
      </label>
      <button className="button" onClick={approveTokens}>Approve</button>
      <div>
        <span>Transaction Status:</span>
        <span>{transactionStatus}</span>
      </div>
    </section>
  );
}