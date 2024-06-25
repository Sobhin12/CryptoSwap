// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract token2 is ERC20("Tiger","Tr") {
    

    uint private cooldownTime =  0 minutes; // works fine change the duration accordingly.
    uint private readyTime=0;

    function _triggerCooldown() internal {
    readyTime = uint(block.timestamp + cooldownTime);
  }

  function _isReady() internal view returns (bool) {
      return (readyTime <= block.timestamp);
  }

    function adder() public {
        //remove cooltime for testing
        _mint(msg.sender, (50*(10**18)));         // Users can mint 50 tokens every cooldownTime
        
    }
    
    // function receiver(uint am) public payable {
    //     address payable mine = payable (address(this));
    //     transfer(mine , am);
    //  }
    
     function balance_caller() public view returns(uint){
        return balanceOf(msg.sender);
     }

     function balance_this() public view returns(uint){
        return balanceOf(address(this));
     }

     
}
