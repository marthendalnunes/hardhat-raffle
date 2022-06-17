import { ethers, network } from "hardhat";
import fs from "fs";
import { DeployFunction } from "hardhat-deploy/types";

const FRONTEND_ADDRESSES_FILE = process.env.FRONTEND_ADDRESSES_FILE || "";
const FRONTEND_ABI_FILE = process.env.FRONTEND_ABI_FILE || "";

const updateFrontEnd: DeployFunction = async function () {
  if (process.env.UPDATE_FRONT_END) {
    updateContractAddresses();
    updateAbi();
  }
};

async function updateAbi() {
  const raffle = await ethers.getContract("Raffle");

  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    JSON.parse(
      JSON.stringify(raffle.interface.format(ethers.utils.FormatTypes.json))
    ),
    "utf8"
  );
}

async function updateContractAddresses() {
  const raffle: any = await ethers.getContract("Raffle");
  const chainId = network.config.chainId!.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf8")
  );
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

export default updateFrontEnd;
updateFrontEnd.tags = ["all", "frontend"];
