// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract X402Receiver {
    address public owner;
    mapping(address => uint256) public payments;

    event PaymentReceived(address indexed payer, uint256 amount, string resourceId);

    constructor() {
        owner = msg.sender;
    }

    function pay(string calldata resourceId) external payable {
        require(msg.value > 0, "Payment must be greater than 0");
        payments[msg.sender] += msg.value;
        emit PaymentReceived(msg.sender, msg.value, resourceId);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
