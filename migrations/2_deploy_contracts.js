/* eslint-disable no-undef */
const EvContract = artifacts.require("EvContract");

module.exports = function(deployer) {
  deployer.deploy(EvContract);
};
