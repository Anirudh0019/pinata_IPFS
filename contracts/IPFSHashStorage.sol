// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IPFSHashStorage is Ownable {
    mapping(address => string[]) private userHashes;

    event HashStored(address indexed user, string ipfsHash);

    constructor() Ownable(msg.sender) {} // Updated constructor

    function storeHash(string memory _ipfsHash) public {
        userHashes[msg.sender].push(_ipfsHash);
        emit HashStored(msg.sender, _ipfsHash);
    }

    function getHashes() public view returns (string[] memory) {
        return userHashes[msg.sender];
    }
}