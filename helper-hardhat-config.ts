import { ethers } from "hardhat";

export interface networkConfigItem {
  name?: string;
  subscriptionId?: string;
  gasLane?: string;
  interval?: string;
  entranceFee?: string;
  callbackGasLimit?: string;
  vrfCoordinatorV2?: string;
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  4: {
    name: "rinkeby",
    subscriptionId: "6522",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    interval: "30",
    entranceFee: ethers.utils.parseEther("0.01").toString(),
    callbackGasLimit: "500000",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
  },
  31337: {
    name: "hardhat",
    entranceFee: ethers.utils.parseEther("0.01").toString(),
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    callbackGasLimit: "500000",
    interval: "30",
  },
};

export const developmentChains = ["hardhat", "localhost"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
