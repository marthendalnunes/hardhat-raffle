import { loadFixture } from "ethereum-waffle";
import { getNamedAccounts, deployments, network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";

// Is the premium. It costs 0.25 LINK per request.
const BASE_FEE = ethers.utils.parseEther("0.25");
// Calculated value based on the gas price of the chain.
const GAS_PRICE_LINK = 1e9; // 100000000

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.name;
  const args = [BASE_FEE, GAS_PRICE_LINK];

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: args,
    });
    log("Mocks Deployed!");
    log("--------------------------------------------");
  }
};

export default deployMocks;
