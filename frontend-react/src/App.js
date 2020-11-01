import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import moment from 'moment';

import { kdsContractAddress, kdsInterface } from './kdsInterface';

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

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    initializeWeb3();
    initializeContract();
    loadContractInfo();
  }, []);

  const initializeWeb3 = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      alert("Please install MetaMask to use the Kudos (KDS) Wallet UI");
    }
  };

  const initializeContract = () => {
    window.kds = new window.web3.eth.Contract(kdsInterface, kdsContractAddress);
  };

  const loadContractInfo = () => {
    window.kds.methods.name().call({}, (_, res) => {
      setTokenName(res);
    })

    window.kds.methods.symbol().call({}, (_, res) => {
      setTokenSymbol(res);
    });

    window.kds.methods.decimals().call({}, (_, res) => {
      setTokenDecimals(res);
    });

    window.kds.methods.totalSupply().call({}, (_, res) => {
      setTokenSupply(res);
    });
  };
  
  const loadTokenBalance = () => {
    if (fromAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    window.kds.methods.balanceOf(fromAddress).call({}, (_, res) => {
      setTokenBalance(res);
    });
  };

  const sendTokens = () => {
    const amountToSend = Number(amount);

    if (fromAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    if (toAddress === '') {
      alert('Enter a recipient address');
      return;
    }

    if (typeof amountToSend !== 'number' || amountToSend < 1) {
      alert('Enter a non negative whole amount to send');
      return;
    }

    window.kds.methods
      .transfer(toAddress, amount)
      .send({ from: fromAddress }, (err, res) => {
        if (err) {
          setTransactionStatus(<span style={{ color: "tomato" }}>Failed to send transaction</span>);
        } else {
          setTransactionStatus(<a target="_blank" href={"https://ropsten.etherscan.io/tx/" + res}>Sent, view on Etherscan</a>)
        }
      })
  };

  const fetchTransactions = () => {
    const baseUrl = 'https://api-ropsten.etherscan.io/api';
    const apiToken = 'UK9YQR8ZHSZNDDNB67BTA7FJK4WFIXVDPY';
    const endpoint = `${baseUrl}?module=account&action=tokentx&address=${fromAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${apiToken}`;
    return fetch(endpoint).then(res => res.json());
  };

  const loadTransactions = () => {
    if (fromAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    fetchTransactions().then(data => {
      const transactions = data.result
        .filter(transaction => transaction.tokenSymbol === tokenSymbol)
        .map(transaction => {
          const { timeStamp, from, to, value, tokenSymbol } = transaction;
          return {
            time: moment.unix(timeStamp).format('DD/MM/YYYY'),
            from,
            to,
            value,
            tokenSymbol
          }
        });
      
      setTransactions(transactions);
    });
  };

  return (
    <div>
      <TokenInformation tokenName={tokenName} tokenSymbol={tokenSymbol} tokenDecimals={tokenDecimals} tokenSupply={tokenSupply} />
      <MyAccount address={fromAddress} setAddress={setFromAddress} tokenBalance={tokenBalance} loadTokenBalance={loadTokenBalance} />
      <NewTransaction amount={amount} setAmount={setAmount} address={toAddress} setAddress={setToAddress} transactionStatus={transactionStatus} sendTokens={sendTokens} />
      <MyTransactions transactions={transactions} loadTransactions={loadTransactions} />
    </div>
  );
}
