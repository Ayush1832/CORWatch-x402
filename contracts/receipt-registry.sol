// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReceiptRegistry {
    struct Receipt {
        address user;
        uint256 timestamp;
        string resourceId;
    }

    mapping(bytes32 => Receipt) public receipts;

    event ReceiptIssued(bytes32 indexed receiptId, address indexed user);

    function issueReceipt(address user, string calldata resourceId) external {
        // Only authorized issuers can call this (e.g. the x402 receiver)
        bytes32 id = keccak256(
            abi.encodePacked(user, resourceId, block.timestamp)
        );
        receipts[id] = Receipt(user, block.timestamp, resourceId);
        emit ReceiptIssued(id, user);
    }

    function verifyReceipt(bytes32 receiptId) external view returns (bool) {
        return receipts[receiptId].timestamp != 0;
    }
}
