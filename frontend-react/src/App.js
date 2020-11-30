import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import moment from 'moment';

import { kdsContractAddress, kdsInterface } from './kdsInterface';

import { MyAccount } from './components/MyAccount';
import { MyTransactions } from './components/MyTransactions';
import { NewTransaction } from './components/NewTransaction';
import { TokenInformation } from './components/TokenInformation';
import { Allowance } from './components/Allowance';
import { Approval } from './components/Approval';
import { TransferFrom } from './components/TransferFrom';

export function App() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");

  const [myAddress, setMyAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);

  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");
  
  const [transactions, setTransactions] = useState([]);

  const [allowanceOwnerAddress, setAllowanceOwnerAddress] = useState("");
  const [allowanceSpenderAddress, setAllowanceSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState(0);

  const [approveAddress, setApproveAddress] = useState("");
  const [approveAmount, setApproveAmount] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState("");

  const [transferFromOwnerAddress, setTransferFromOwnerAddress] = useState("");
  const [transferFromSpenderAddress, setTransferFromSpenderAddress] = useState("");
  const [transferFromAmount, setTransferFromAmount] = useState(0);
  const [transferFromStatus, setTransferFromStatus] = useState("");

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
    if (myAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    window.kds.methods.balanceOf(myAddress).call({}, (_, res) => {
      setTokenBalance(res);
    });
  };

  const transfer = () => {
    const amountToSend = Number(transferAmount);

    if (myAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    if (transferAddress === '') {
      alert('Enter a recipient address');
      return;
    }

    if (typeof amountToSend !== 'number' || amountToSend < 1) {
      alert('Enter a non negative whole amount to send');
      return;
    }

    window.kds.methods
      .transfer(transferAddress, transferAmount)
      .send({ from: myAddress }, (err, res) => {
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

  const fetchTransactions = () => {
    const baseUrl = 'https://api-ropsten.etherscan.io/api';
    const apiToken = 'UK9YQR8ZHSZNDDNB67BTA7FJK4WFIXVDPY';
    const endpoint = `${baseUrl}?module=account&action=tokentx&address=${myAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${apiToken}`;
    return fetch(endpoint).then(res => res.json());
  };

  const loadTransactions = () => {
    if (myAddress === '') {
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

  const loadAllowance = () => {
    if (allowanceOwnerAddress === '') {
      alert('Enter an owner address to display allowance from');
      return;
    }

    if (allowanceSpenderAddress === '') {
      alert('Enter a spender address to display allowance from');
      return;
    }

    window.kds.methods
      .allowance(allowanceOwnerAddress, allowanceSpenderAddress)
      .call({}, (_, res) => {
        setAllowance(res);
      });
  }

  const approveTokens = () => {
    const amountToApprove = Number(approveAmount);

    if (myAddress === '') {
      alert('Enter your address under "My Account"');
      return;
    }

    if (approveAddress === '') {
      alert("Enter an address to approve tokens to");
      return;
    }

    if (typeof amountToApprove !== 'number' || amountToApprove < 1) {
      alert("Enter a non negative whole amount to approve to spender");
      return;
    }
    
    window.kds.methods
      .approve(approveAddress, approveAmount)
      .send({ from: myAddress }, (err, res) => {
        if (err) {
          setApprovalStatus(
            <span style={{ color: "tomato" }}>Failed to send transaction</span>
          );
        } else {
          setApprovalStatus(
            <a target="_blank" rel="noreferrer" href={"https://ropsten.etherscan.io/tx/" + res}>
              Sent, view on Etherscan
            </a>
          )
        }
      });
  }

  const transferFrom = () => {
    const amountToTransferFrom = Number(transferFromAmount);

    if (transferFromOwnerAddress === '') {
      alert("");
      return;
    }

    if (transferFromSpenderAddress === '') {
      alert("");
      return;
    }

    if (transferFromAmount === '') {
      alert("");
      return;
    }

    window.kds.methods
      .transferFrom(transferFromOwnerAddress, transferFromSpenderAddress, amountToTransferFrom)
      .send({ from: myAddress }, (err, res) => {
        if (err) {
          setTransferFromStatus(
            <span style={{ color: "tomato" }}>Failed to send transaction</span>
          );
        } else {
          setTransferFromStatus(
            <a target="_blank" rel="noreferrer" href={"https://ropsten.etherscan.io/tx/" + res}>
              Sent, view on Etherscan
            </a>
          )
        }
      });
  }

  return (
    <div>
      <ul class="tabs" data-tabs id="example-tabs">
        <li class="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
        <li class="tabs-title"><a data-tabs-target="panel2" href="#panel2">Tab 2</a></li>
      </ul>
      
      <TokenInformation 
        tokenName={tokenName} 
        tokenSymbol={tokenSymbol} 
        tokenDecimals={tokenDecimals} 
        tokenSupply={tokenSupply} />
      <MyAccount 
        address={myAddress} 
        setAddress={setMyAddress} 
        tokenBalance={tokenBalance} 
        loadTokenBalance={loadTokenBalance} />
      <NewTransaction 
        amount={transferAmount} 
        setAmount={setTransferAmount} 
        address={transferAddress} 
        setAddress={setTransferAddress} 
        transactionStatus={transactionStatus} 
        transfer={transfer} />
      <MyTransactions 
        transactions={transactions} 
        loadTransactions={loadTransactions} />
      <Allowance 
        ownerAddress={allowanceOwnerAddress} 
        setOwnerAddress={setAllowanceOwnerAddress} 
        spenderAddress={allowanceSpenderAddress} 
        setSpenderAddress={setAllowanceSpenderAddress} 
        allowance={allowance} 
        loadAllowance={loadAllowance} />
      <Approval 
        amount={approveAmount}
        setAmount={setApproveAmount}
        address={approveAddress}
        setAddress={setApproveAddress}
        transactionStatus={approvalStatus}
        approveTokens={approveTokens} />
      <TransferFrom 
        amount={transferFromAmount}
        setAmount={setTransferFromAmount}
        ownerAddress={transferFromOwnerAddress}
        setOwnerAddress={setTransferFromOwnerAddress}
        spenderAddress={transferFromSpenderAddress}
        setSpenderAddress={setTransferFromSpenderAddress}
        transactionStatus={transferFromStatus}
        transferFrom={transferFrom} />
    </div>
  );
}
