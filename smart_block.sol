// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartHome {
    address public owner;
    mapping(address => mapping(bytes32 => bool)) public deviceAccess;

    event DeviceStatusChanged(address indexed device, bool status);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function registerDevice(bytes32 deviceId) public {
        deviceAccess[msg.sender][deviceId] = true;
    }

    function revokeDeviceAccess(address user, bytes32 deviceId) public onlyOwner {
        deviceAccess[user][deviceId] = false;
    }

    function controlDevice(bytes32 deviceId, bool status) public {
        require(deviceAccess[msg.sender][deviceId], "Access denied for this device");
        emit DeviceStatusChanged(msg.sender, status);
    }
}
