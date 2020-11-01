import React, { useEffect, useState } from 'react';

import { MyAccount } from './components/MyAccount';
import { MyTransactions } from './components/MyTransactions';
import { NewTransaction } from './components/NewTransaction';
import { TokenInformation } from './components/TokenInformation';

export function App() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");

  const [fromAddress, setFromAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);

  const [amount, setAmount] = useState(0);
  const [toAddress, setToAddress] = useState("");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {}, []);
  
  const fetchTokenBalance = () => {

  }

  const sendTokens = () => {

  }

  const fetchTransactions = () => {

  }

  return (
    <div>
      <TokenInformation tokenName={tokenName} tokenSymbol={tokenSymbol} tokenDecimals={tokenDecimals} tokenSupply={tokenSupply} />
      <MyAccount address={fromAddress} setAddress={setFromAddress} tokenBalance={tokenBalance} fetchTokenBalance={fetchTokenBalance} />
      <NewTransaction amount={amount} setAmount={setAmount} address={toAddress} setAddress={setToAddress} sendTokens={sendTokens} />
      <MyTransactions transactions={transactions} fetchTransactions={fetchTransactions} />
    </div>
  );
}
