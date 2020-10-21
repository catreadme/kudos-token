# Kudos ERC20 Token
> Kudos is a simple ERC20 token developed for the ADSB lecture at OST university of applied sciences.

## Development
* Copy `.sol` files into the [remix online ide](https://remix.ethereum.org/)
* Adjust `import` paths if necessary
* Compile
* Deploy to JS VM

## KDS Contract
* `KDSToken.sol` is the main token contract
* `IERC20.sol` is an interface that conforms to the [ERC20 specification](https://eips.ethereum.org/EIPS/eip-20)
* `libs/SafeMath.sol` is a [library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/math/SafeMath.sol) taken from [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)

### Contract Deployment
* **Ropsten** Test Network: https://ropsten.etherscan.io/token/0xe2e2f6881c20c873d8e53e21ba942f865e25561a