const token1 = artifacts.require("./pool.sol");

module.exports = function(deployer) {
      const token1Address = "0xe5B753563CD53571faB00ae003A245cAE34cb7be";
      const token2Address = "0xb560a5aAd55a04e1B393a37D6bcc844f07422313";

      deployer.deploy(token1, token1Address, token2Address);
   // deployer.deploy(token1);
};
