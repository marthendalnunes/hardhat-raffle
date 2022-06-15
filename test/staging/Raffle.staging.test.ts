import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { developmentChains, networkConfig } from "../../helper-hardhat-config";
import { Raffle, VRFCoordinatorV2Mock } from "../../typechain-types";

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle Staging Tests", function () {
      let raffle: Raffle;
      let entranceFee: BigNumber;
      let deployer: SignerWithAddress;
      let accounts: SignerWithAddress[];

      beforeEach(async function () {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        raffle = await ethers.getContract("Raffle", deployer);
        entranceFee = await raffle.getEntranceFee();
      });

      describe("fulfillRandomWords", function () {
        it("Works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
          const startingTimestamp = await raffle.getLatestTimestamp();
          const deployerAccount = await ethers.getSigners();

          await new Promise<void>(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
              console.log("Winnerpicked event fired!");
              resolve();
              try {
                const recentWinner = await raffle.getRecentWinner();
                const raffleState = await raffle.getRaffleState();
                const winnerEndingBalance = await accounts[0].getBalance();
                const endingTimestamp = await raffle.getLatestTimestamp();

                await expect(raffle.getPlayer(0)).to.be.reverted;
                assert.equal(recentWinner.toString(), accounts[0].address);
                assert.equal(raffleState, 0);
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStaringBalance.add(entranceFee).toString()
                );
                assert(endingTimestamp > startingTimestamp);
                resolve;
              } catch (error) {
                console.log(error);
                reject(error);
              }
            });

            await raffle.enterRaffle({ value: entranceFee });
            const winnerStaringBalance = await accounts[0].getBalance();
          });
        });
      });
    });
