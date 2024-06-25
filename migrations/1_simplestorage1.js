const token1 = artifacts.require("./pool.sol");

module.exports = function(deployer) {
      const token1Address = "0x0FE4733c9b297e11254c627CaDacAcC2d128588B";
      const token2Address = "0x02F06B8782b6d177Ae54c7E76D135141d33bfC64";

      deployer.deploy(token1, token1Address, token2Address);
   // deployer.deploy(token1);
};
