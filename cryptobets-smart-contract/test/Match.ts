import { expect } from "chai";
import { formatEther } from "ethers/lib/utils";
import { ethers, waffle } from "hardhat";

const MATCH_CONTRACT_NAME = "Match";

describe(MATCH_CONTRACT_NAME, function () {
  it("Create Match", async function () {
    const Match = await ethers.getContractFactory(MATCH_CONTRACT_NAME);
    const matchBox = await Match.deploy();
    await matchBox.deployed();

    const txMatch = await matchBox.createMatch({
      id: 1,
      status: 0,
      availableBetSlugs: ["won:won-1", "won:won-2"],
      winningBetSlugs: [],
      totalAmount: 0,
      isExist: true,
    });

    await txMatch.wait();

    const findMatch = await matchBox.getMatch(1);

    expect(findMatch.id).to.equal(1);
  });

  it("Pay deposit in contract", async function () {
    const MatchFactory = await ethers.getContractFactory(MATCH_CONTRACT_NAME);
    const matchBox = await MatchFactory.deploy();
    await matchBox.deployed();

    await matchBox.createMatch({
      id: 2,
      status: 0,
      availableBetSlugs: ["won:won-1", "won:won-2"],
      winningBetSlugs: [],
      totalAmount: 0,
      isExist: true,
    });

    const signers = await ethers.getSigners();

    for (let i = 0; i < 100; i++) {
      await matchBox.placeBid(2, "won:won-1", {
        from: signers[0].address,
        value: ethers.utils.parseEther("1"),
      });
    }

    const findMatch = await matchBox.getMatch(2);
    const totalAmount = await findMatch.totalAmount;
    const totalAmountEther = formatEther(totalAmount.toString()).toString();
    expect(Number(totalAmountEther)).to.greaterThan(90);
  });

  it("Withdraw from contract", async function () {
    const MatchFactory = await ethers.getContractFactory(MATCH_CONTRACT_NAME);
    const matchBox = await MatchFactory.deploy();
    await matchBox.deployed();

    const provider = waffle.provider;
    const signer = await provider.getSigner();

    await matchBox.createMatch({
      id: 1,
      status: 0,
      availableBetSlugs: ["won:won-1", "won:won-2"],
      winningBetSlugs: [],
      totalAmount: 0,
      isExist: true,
    });

    const signers = await ethers.getSigners();
    const balanceBefore = formatEther(await signer.getBalance());
    console.log(balanceBefore);

    await matchBox.placeBid(1, "won:won-1", {
      from: signers[0].address,
      value: ethers.utils.parseEther("100"),
    });

    await matchBox.placeBid(1, "won:won-2", {
      from: signers[0].address,
      value: ethers.utils.parseEther("50"),
    });

    await matchBox.updateMatch(1, 2, ["won:won-1"]);
    await matchBox.withdraw(1);

    const matchAfter = await matchBox.getMatch(1);
    const matchSlugAmoutTotalAfterWon1 =
      await matchBox.getMatchAmountTotalBySlug(1, "won:won-1");
    const matchSlugAmoutTotalAfterWon2 =
      await matchBox.getMatchAmountTotalBySlug(1, "won:won-2");

    expect(Number(formatEther(matchAfter.totalAmount))).equal(0);
    expect(Number(formatEther(matchSlugAmoutTotalAfterWon1))).equal(0);
    expect(Number(formatEther(matchSlugAmoutTotalAfterWon2))).equal(0);
  });
});
