import { ethers } from "hardhat";

// test

async function main() {
  const MatchFactory = await ethers.getContractFactory("Match");
  const match = await MatchFactory.deploy();

  await match.deployed();

  console.log("Match deployed to:", match.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
