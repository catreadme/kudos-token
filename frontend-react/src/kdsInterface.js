export const kdsContractAddress = '0xe2e2f6881c20c873d8e53e21ba942f865e25561a';

export const kdsInterface = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "spender", "type": "address"}, {"name": "tokens", "type": "uint256"}],
  "name": "approve",
  "outputs": [{"name": "success", "type": "bool"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {
    "name": "tokens",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{"name": "success", "type": "bool"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{"name": "", "type": "uint8"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "owner", "type": "address"}],
  "name": "balanceOf",
  "outputs": [{"name": "balance", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "to", "type": "address"}, {"name": "tokens", "type": "uint256"}],
  "name": "transfer",
  "outputs": [{"name": "success", "type": "bool"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
  "name": "allowance",
  "outputs": [{"name": "remaining", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {"indexed": false, "name": "value", "type": "uint256"}],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {"indexed": false, "name": "value", "type": "uint256"}],
  "name": "Approval",
  "type": "event"
}];