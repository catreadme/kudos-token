import React, { useState } from 'react';

export function NewTransaction({ 
  amount, 
  setAmount,
  fromAddress,
  setFromAddress,
  toAddress, 
  setToAddress, 
  transactionStatus, 
  transfer,
  transferFrom,
  approve
}) {
  const [selectedAction, setSelectedAction] = useState("transfer");

  const transact = () => {
    const numberAmount = Number(amount);

    if (typeof numberAmount !== 'number' || numberAmount < 1) {
      alert('Enter a non negative whole amount');
      return;
    }

    if (selectedAction === 'transferFrom' && fromAddress === '') {
      alert('Enter a "From Address"');
      return;
    }

    if (toAddress === '') {
      alert('Enter a "To Address"');
      return;
    }

    switch (selectedAction) {
      case 'transfer':
        transfer();
        break;
      case 'transferFrom':
        transferFrom();
        break;
      case 'approve':
        approve();
        break;
      default:
        break;
    }
  }

  return (
    <section>
      <h4>New Transaction</h4>
      <label>
        <span>Action</span>
        <select value={selectedAction} onChange={event => setSelectedAction(event.target.value)}>
          <option value="transfer">Transfer</option>
          <option value="transferFrom">Transfer From</option>
          <option value="approve">Approve</option>
        </select>
      </label>
      <label>
        <span>{selectedAction === "approve" ? "Approve" : "Send"} Amount:</span>
        <input type="number" step="1" min="1" placeholder="5" value={amount} 
          onChange={event => setAmount(Number(event.target.value))} />
      </label>
      {selectedAction === "transferFrom" &&
        <label>
          <span>From Address:</span>
          <input type="text" placeholder="0x6c1a..." value={fromAddress}
            onChange={event => setFromAddress(event.target.value)} />
        </label>
      }
      <label>
        <span>To Address:</span>
        <input type="text" placeholder="0x6c1a..." value={toAddress} 
          onChange={event => setToAddress(event.target.value)} />
      </label>
      <button className="button" onClick={transact}>Send</button>
      <div>
        <span>Transaction Status:</span>
        <span>{transactionStatus}</span>
      </div>
    </section>
  );
}
