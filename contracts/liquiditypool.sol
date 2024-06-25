// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract pool is ERC20("loyalty points","lp"){

        IERC20 token1;  //ETH
        IERC20 token2;  //DAI
      // loyalty points for liquidity providers
    

    constructor(address _token1, address _token2) {
        require(_token1 != address(0) && _token2 != address(0), "Invalid token address");
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
    }

    uint private ratio = 0;
    address payable og = payable(address(this));
    uint public total_lp =0;

function adder(uint c1) public {   
        _mint(msg.sender, (c1*(10**18)));         // Users can mint 50 tokens every cooldownTime
    }

    // We can do this in C to save gas

    // function reqValue_C2(uint c1) public view returns(uint){

    //     uint value = token2.balanceOf(address(this))*(10**18)/token1.balanceOf(address(this)) ; // Did 10^20 instead of 10^18 to show 2 decimal places

    //     return (c1*value);   
    // 

    // function reqValue_C1(uint c2) public view returns(uint){

    //     uint value = token1.balanceOf(address(this))*(10**18)/token2.balanceOf(address(this)) ;

    //     return (c2*value);  
    // }

    function liquidityproviders(uint c1, uint c2) public payable {
        lpPointsDistributor(c1,c2);

        if(token2.balanceOf(address(this)) == 0) ratio=(10**5) ; 
        else ratio = (token2.balanceOf(address(this))*(10**5)) / token1.balanceOf(address(this)) ; 
        address payable gg = payable(msg.sender);
        require( ((c2*(10**18))/c1) >= ratio , "Need to provide as per req value");     // Putting greater than because ratio should match
        require(token1.transferFrom(gg,og,c1*(10**18)),"Transact of token1 is failed" );
        require(token2.transferFrom(gg,og,c2*(10**18)),"Transact of token2 is failed" );
        
       
        
    }

    function accountBalance()public view returns(uint,uint,uint){
        return (token1.balanceOf(address(this)),token2.balanceOf(address(this)),balanceOf(msg.sender) );
        
    }
    






// trading c2 for c1
    function trade_C2ForC1(uint c1) public payable {
        if(token2.balanceOf(address(this)) == 0) ratio=10**5 ;  // don't need || as if one zero another also would be zero
        else ratio = token2.balanceOf(address(this)) *(10**5)/ token1.balanceOf(address(this)) ;
       
        require(token1.transferFrom(msg.sender, address(this), c1));
        // extracting from the pool
        token2.transfer(msg.sender,c1*ratio*1000/1003);   //Sending money after deducting transaction fee => customer should give 0.3% extra before itself
        

    }

// trading c1 for c2
    function trade_C1ForC2(uint c2) public payable {
         if(token2.balanceOf(address(this)) == 0) ratio=10**5; 
        else ratio = token1.balanceOf(address(this)) *(10**5)/ token2.balanceOf(address(this)) ;
       
        require(token2.transferFrom(msg.sender, address(this), c2));
        // extracting from the pool
        token1.transfer(msg.sender,c2*ratio*1000/1003);
        
    }
// Need to think for sharing transfer fee and amount of liquidity points

    function lpPointsDistributor(uint c1, uint c2) public payable {
        uint loyaltyp=0;
        if(token2.balanceOf(address(this))==0) {
            loyaltyp=(c1+c2)*(10**5);
            total_lp+=loyaltyp;
        }
        else {
            loyaltyp= (((10**5)*token1.balanceOf(address(this))*c2*total_lp ) / token2.balanceOf(address(this)) )/c1;
            total_lp+=loyaltyp;
        }
        adder(loyaltyp); //need to change it acc to contribution
    }

// Need to create incentive function so that user can revieve the compensation as per lp 
    function incentive(uint _lpback) public payable {
        uint k1=0;
        uint k2=0;
        k1 = token1.balanceOf(address(this))*_lpback/total_lp;
        k2 = token2.balanceOf(address(this))*_lpback/total_lp;
        token1.transfer(msg.sender,k1);
        token2.transfer(msg.sender,k2);
    }


}

//0x78c4E798b65f1c96c4eEC6f5F93E51584593e723,0x5A606B5F9535c13B2F8DC12B3b976e9dC11427e6
//0x7Dd7622649035B7460DF4c94D6dDE5c6Abc84e95,0x45373635641f5C51bf1029FdF2A225674D61AD45