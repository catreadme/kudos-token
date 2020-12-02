import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Web3 from 'web3';
import moment from 'moment';

import { kdsContractAddress, kdsInterface } from './kdsInterface';

import { TokenInformation } from './components/TokenInformation';
import { Balance } from './components/Balance';
import { Allowance } from './components/Allowance';
import { NewTransaction } from './components/NewTransaction';
import { MyTransactions } from './components/MyTransactions';

export function App() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");

  const [balance, setBalance] = useState(0);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState(0);

  const [amount, setAmount] = useState(0);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
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
  
  const loadBalance = () => {
    window.kds.methods.balanceOf(window.ethereum.selectedAddress).call({}, (_, res) => {
      setBalance(res);
    });
  };

  const loadAllowance = () => {
    window.kds.methods
      .allowance(ownerAddress, spenderAddress)
      .call({}, (_, res) => {
        setAllowance(res);
      });
  }

  const transfer = () => {
    window.kds.methods
      .transfer(toAddress, amount)
      .send({ from: window.ethereum.selectedAddress }, (err, res) => {
        if (err) {
          setTransactionStatus(
            <span style={{ color: "tomato" }}>Failed to send transaction</span>
          );
        } else {
          setTransactionStatus(
            <a target="_blank" rel="noreferrer" href={"https://ropsten.etherscan.io/tx/" + res}>
              Sent, view on Etherscan
            </a>
          )
        }
      })
  };

  const transferFrom = () => {
    window.kds.methods
      .transferFrom(fromAddress, toAddress, amount)
      .send({ from: window.ethereum.selectedAddress }, (err, res) => {
        if (err) {
          setTransactionStatus(
            <span style={{ color: "tomato" }}>Failed to send transaction</span>
          );
        } else {
          setTransactionStatus(
            <a target="_blank" rel="noreferrer" href={"https://ropsten.etherscan.io/tx/" + res}>
              Sent, view on Etherscan
            </a>
          )
        }
      });
  }

  const approve = () => {   
    window.kds.methods
      .approve(toAddress, amount)
      .send({ from: window.ethereum.selectedAddress }, (err, res) => {
        if (err) {
          setTransactionStatus(
            <span style={{ color: "tomato" }}>Failed to send transaction</span>
          );
        } else {
          setTransactionStatus(
            <a target="_blank" rel="noreferrer" href={"https://ropsten.etherscan.io/tx/" + res}>
              Sent, view on Etherscan
            </a>
          )
        }
      });
  }

  const fetchTransactions = () => {
    const baseUrl = 'https://api-ropsten.etherscan.io/api';
    const apiToken = 'UK9YQR8ZHSZNDDNB67BTA7FJK4WFIXVDPY';
    const endpoint = `${baseUrl}?module=account&action=tokentx&address=${window.ethereum.selectedAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${apiToken}`;
    return fetch(endpoint).then(res => res.json());
  };

  const loadTransactions = () => {
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
      <h1>Kudos (KDS) Wallet UI</h1>
      <ul className="menu">
        <li><a href="/info">Token Info</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href="/new-transaction">New Transaction</a></li>
        <li><a href="/transactions">Transactions</a></li>
      </ul>
      
      <Router>
        <Switch>
          <Route path="/info">
            <TokenInformation 
              tokenName={tokenName} 
              tokenSymbol={tokenSymbol} 
              tokenDecimals={tokenDecimals} 
              tokenSupply={tokenSupply} />
          </Route>
          <Route path="/account">
            <Balance 
              address={window.ethereum.selectedAddress} 
              balance={balance} 
              loadBalance={loadBalance} />
            <Allowance 
              ownerAddress={ownerAddress} 
              setOwnerAddress={setOwnerAddress} 
              spenderAddress={spenderAddress} 
              setSpenderAddress={setSpenderAddress} 
              allowance={allowance} 
              loadAllowance={loadAllowance} />
          </Route>
          <Route path="/new-transaction">
            <NewTransaction 
              amount={amount} 
              setAmount={setAmount} 
              myAddress={window.ethereum.selectedAddress}
              fromAddress={fromAddress}
              setFromAddress={setFromAddress}
              toAddress={toAddress} 
              setToAddress={setToAddress} 
              transactionStatus={transactionStatus} 
              transfer={transfer}
              transferFrom={transferFrom}
              approve={approve} />
          </Route>
          <Route path="/transactions">
            <MyTransactions 
              transactions={transactions} 
              loadTransactions={loadTransactions} />
          </Route>
          <Route path="/">
            <Redirect to="/account" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
