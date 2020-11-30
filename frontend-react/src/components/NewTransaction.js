import React from 'react';

export function NewTransaction({ 
  amount, 
  setAmount, 
  address, 
  setAddress, 
  transactionStatus, 
  transfer 
}) {
  return (
    <section>
      <h4>New Transaction</h4>
      <label>
        <span>Send Amount:</span>
        <input type="number" step="1" min="1" placeholder="5" value={amount} 
          onChange={event => setAmount(event.target.value)} />
      </label>
      <label>
        <span>To Address:</span>
        <input type="text" placeholder="0x6c1a..." value={address} 
          onChange={event => setAddress(event.target.value)} />
      </label>
      <button className="button" onClick={transfer}>Send</button>
      <div>
        <span>Transaction Status:</span>
        <span>{transactionStatus}</span>
      </div>
    </section>
  );
}
