pragma solidity ^0.4.24;

import "./IERC20.sol";
import "./libs/SafeMath.sol";

contract KDSToken is IERC20 {
    using SafeMath for uint256;

    string public  name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor() public {
        name = "Kudos";
        symbol = "KDS";
        decimals = 0;

        totalSupply = 100;

        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function name() public view returns (string) {
        return name;
    }

    function symbol() public view returns (string) {
        return symbol;
    }

    function decimals() public view returns (uint8) {
        return decimals;
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply - balances[address(0)];
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return balances[owner];
    }

    function transfer(address to, uint256 tokens) public returns (bool success) {
        require(tokens <= balances[msg.sender]);

        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);

        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint256 tokens) public returns (bool success) {
        require(tokens <= balances[from]);
        require(tokens <= allowed[from][msg.sender]);

        balances[from] = balances[from].sub(tokens);
        balances[to] = balances[to].add(tokens);

        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);

        emit Transfer(from, to, tokens);
        return true;
    }

    function approve(address spender, uint256 tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;

        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256 remaining) {
        return allowed[owner][spender];
    }
}
