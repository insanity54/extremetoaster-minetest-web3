const RentableVips = artifacts.require("RentableVips");

module.exports = function (deployer) {
  deployer.deploy(RentableVips);
};
