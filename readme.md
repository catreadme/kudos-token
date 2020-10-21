# Kudos ERC20 Token
> Kudos is a simple ERC20 token developed for the ADSB lecture at OST university of applied sciences.

## Development
* Copy `.sol` files into the [remix online ide](https://remix.ethereum.org/)
* Compile
* Deploy to JS VM for testing
* Deploy to test network
  * * **Ropsten** Test Network: https://ropsten.etherscan.io/token/0xe2e2f6881c20c873d8e53e21ba942f865e25561a

## KDS Contract
* `contract/KDSToken.sol` is the main token contract
* `contract/IERC20.sol` is an interface that conforms to the [ERC20 specification](https://eips.ethereum.org/EIPS/eip-20)
* `contract/SafeMath.sol` is a [library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/math/SafeMath.sol) taken from [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)

### Methods
* Test methods inside [remix](https://remix.ethereum.org/) (Deploy to JS VM)
* Methods are explained on [ERC20 specification](https://eips.ethereum.org/EIPS/eip-20)  

![methods](docs/img/kds_m1.png)  

![methods](docs/img/kds_m2.png)

## Frontend
* [web3.js](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html) for handling the contract interaction
