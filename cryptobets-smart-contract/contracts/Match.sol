//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Match is Ownable {
    enum Status {
        not_started,
        running,
        finalized,
        closed
    }

    struct Bet {
        address owner;
        string slug;
        uint256 amount;
    }

    struct MatchStruct {
        uint64 id;
        Status status;
        uint256 totalAmount;
        string[] availableBetSlugs;
        string[] winningBetSlugs;
        bool isExist;
    }

    event NewMatch(MatchStruct);
    event NewBet(uint64, Bet);
    event Received(address, uint256);

    address public feeAddress = address(0x90F79bf6EB2c4f870365E785982E1f101E93b906);
    uint8 public feePercent = 1;
    mapping(uint64 => MatchStruct) public matches;
    mapping(uint64 => Bet[]) public bets;
    mapping(uint64 => mapping(string => bool)) public availableBetSlugsExist;
    mapping(uint64 => mapping(string => bool)) public winningBetSlugsExist;
    mapping(uint64 => mapping(address => Bet[])) public betsByUsers;
    mapping(uint64 => mapping(string => Bet[])) public betsBySlug;
    mapping(uint64 => mapping(string => uint256)) public matchSlugsAmountTotal;

    function createMatch(MatchStruct memory _match) public onlyOwner {
        require(!matches[_match.id].isExist, "Match by this id already exists");

        string[] memory emptyWinnings;
        MatchStruct memory newMatch = MatchStruct(
            _match.id,
            _match.status,
            0,
            _match.availableBetSlugs,
            emptyWinnings,
            true
        );

        matches[_match.id] = newMatch;

        for (uint8 i = 0; i < _match.availableBetSlugs.length; i++) {
            availableBetSlugsExist[_match.id][_match.availableBetSlugs[i]] = true;
        }

        emit NewMatch(newMatch);
    }

    function updateMatch(
        uint64 _matchId,
        Status _status,
        string[] memory _winningBetSlugs
    ) public onlyOwner {
        MatchStruct memory findMatch = matches[_matchId];

        require(findMatch.isExist, "Match not found.");

        matches[_matchId].status = _status;
        matches[_matchId].winningBetSlugs = _winningBetSlugs;

        for (uint8 i = 0; i < _winningBetSlugs.length; i++) {
            winningBetSlugsExist[_matchId][_winningBetSlugs[i]] = true;
        }
    }

    function placeBid(uint64 _matchId, string memory _slugBet)
        external
        payable
    {
        require(msg.value > 0, "Not less than zero.");

        MatchStruct memory findMatch = matches[_matchId];
        require(
            findMatch.status == Status.not_started,
            "Match is already in progress or has ended."
        );

        require(
            availableBetSlugsExist[_matchId][_slugBet],
            "Slug isn't available."
        );

        uint256 feeAmount = (msg.value / 100) * feePercent;
        uint256 amountWithoutFee = msg.value - feeAmount;

        payable(feeAddress).transfer(feeAmount);

        Bet memory newBet = Bet({
            owner: msg.sender,
            amount: amountWithoutFee,
            slug: _slugBet
        });

        bets[_matchId].push(newBet);
        betsByUsers[_matchId][msg.sender].push(newBet);
        betsBySlug[_matchId][_slugBet].push(newBet);
        matchSlugsAmountTotal[_matchId][_slugBet] += amountWithoutFee;
        matches[_matchId].totalAmount += amountWithoutFee;

        emit NewBet(_matchId, newBet);
    }

    function withdraw(uint64 _matchId) external {
        MatchStruct memory findMatch = matches[_matchId];
        require(
            findMatch.status == Status.finalized ||
                findMatch.status == Status.closed,
            "Match is not ended."
        );

        Bet[] memory myBets = betsByUsers[_matchId][msg.sender];
        uint256 amountAll;
        uint256 amountWons;

        for (uint8 i = 0; i < myBets.length; i++) {
            amountAll += myBets[i].amount;
            if (winningBetSlugsExist[_matchId][myBets[i].slug]) {
                amountWons += myBets[i].amount;
            }

            matchSlugsAmountTotal[_matchId][myBets[i].slug] -= myBets[i].amount;
        }

        matches[_matchId].totalAmount -= amountAll;

        if (findMatch.status == Status.finalized) {
            payable(msg.sender).transfer(amountWons);
        }

        if (findMatch.status == Status.closed) {
            payable(msg.sender).transfer(amountAll);
        }
    }

    function getMatch(uint64 _matchId)
        public
        view
        returns (MatchStruct memory)
    {
        return matches[_matchId];
    }

    function getBetsByUser(uint64 _matchId) public view returns (Bet[] memory) {
        return betsByUsers[_matchId][msg.sender];
    }

    function getBetsByMatch(uint64 _matchId)
        public
        view
        returns (Bet[] memory)
    {
        return bets[_matchId];
    }

    function getMatchAmountTotalBySlug(uint64 _matchId, string memory _slug) public view returns (uint256) {
        return matchSlugsAmountTotal[_matchId][_slug];
    }

    // function setFeeAddressMatch(address _matchAddress, address _feeAddress)
    //     external
    //     onlyOwner
    // {
    //     MatchOptimize findMatch = MatchOptimize(payable(_matchAddress));
    //     findMatch.setFeeAddress(_feeAddress);
    // }
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
