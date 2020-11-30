import React from 'react';

export function TransferFrom({ 
  amount, 
  setAmount, 
  ownerAddress, 
  setOwnerAddress, 
  spenderAddress,
  setSpenderAddress,
  transactionStatus, 
  transferFrom 
}) {
  return (
    <section>
      <h4>Transfer From</h4>
      <label>
        <span>Send Amount:</span>
        <input type="number" step="1" min="1" placeholder="5" value={amount} 
          onChange={event => setAmount(event.target.value)} />
      </label>
      <label>
        <span>From Address:</span>
        <input type="text" placeholder="0x6c1a..." value={ownerAddress} 
          onChange={event => setOwnerAddress(event.target.value)} />
      </label>
      <label>
        <span>To Address:</span>
        <input type="text" placeholder="0x6c1a..." value={spenderAddress} 
          onChange={event => setSpenderAddress(event.target.value)} />
      </label>
      <button className="button" onClick={transferFrom}>Send</button>
      <div>
        <span>Transaction Status:</span>
        <span>{transactionStatus}</span>
      </div>
    </section>
  );
}
