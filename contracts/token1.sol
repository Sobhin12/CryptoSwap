// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract token1 is ERC20("Lion", "Ln") {
    uint private cooldownTime = 0 minutes; // works fine change the duration accordingly.
    uint private readyTime = 0;

    function _triggerCooldown() internal {
        readyTime = uint(block.timestamp + cooldownTime);
    }

    function _isReady() internal view returns (bool) {
        return (readyTime <= block.timestamp);
    }

    function adder() public {
       
        _mint(msg.sender, 50 * (10**18)); // Users can mint 50 tokens every cooldownTime
        
    }

    function balance_caller() public view returns (uint) {
        return balanceOf(msg.sender);
    }

    function balance_this() public view returns (uint) {
        return balanceOf(address(this));
    }
}
