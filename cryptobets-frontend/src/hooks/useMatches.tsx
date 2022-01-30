import React from 'react'
import useWeb3 from '@hooks/useWeb3'
import { Bet, MatchInfo, MatchInfoWithBets } from '@interfaces/match'
import Big from 'bignumber.js'
import { BigNumber } from 'ethers'
import { getAllMatches, getMatchById } from '@api/cryptobets'

const useMatches = (sport?: string) => {
  const { contract, address } = useWeb3()
  const [matches, setMatches] = React.useState<MatchInfoWithBets[]>([])

  const handleUpdateMatches = (newMatches: MatchInfoWithBets[]) => {
    setMatches(newMatches)
  }

  const handleAddMatch = async (match: MatchInfo) => {
    const newMatch = await getMatchById(match.id.toString())

    const bets = await getMatchBets(newMatch.id, newMatch.available_bet_slugs)

    if (!bets) return

    setMatches(prevState => ([...prevState, {
      ...newMatch,
      status: newMatch.status,
      totalAmount: match.totalAmount,
      betSlugsAmountTotal: bets.betSlugsAmountTotal,
      winningBetsSlugs: match.winningBetsSlugs,
      allBets: bets.allBets,
      myBets: bets.myBets,
    }]))
  }

  const getMatchBets = async (matchId: string, availableBetSlugs: string[]) => {
    if (!contract) return

    const allBets = await contract.getBetsByMatch(matchId)
    let myBets: Bet[] = []

    let betSlugsAmountTotal: { [slug: string]: BigNumber } = {}
    for (const slug of availableBetSlugs) {
      betSlugsAmountTotal[slug] = await contract.getMatchAmountTotalBySlug(matchId, slug)
    }

    for (const bet of allBets) {
      if (address === bet.owner.toString()) {
        const findBet = myBets.find((item) => item.slug === bet.slug)

        if (findBet) {
          myBets = myBets.map((item) => {
            const valTotalAmount = new Big(item.amount._hex).plus(bet.amount._hex)
            const valTotalAmountHex = '0x' + valTotalAmount.toString(16)
            return {
              ...item,
              amount: BigNumber.from(valTotalAmountHex),
            }
          })
        } else {
          myBets.push(bet)
        }
      }
    }

    return {
      allBets,
      myBets,
      betSlugsAmountTotal,
    }
  }

  React.useEffect(() => {
    ;(async() => {
      if (!contract) return

      const allMatchesApi = await getAllMatches(sport)
      const matchesArray: MatchInfoWithBets[] = []

      for (const match of allMatchesApi) {
        const matchInfo = await contract.getMatch(match.id)
        if (!matchInfo.isExist) continue

        const bets = await getMatchBets(match.id, match.available_bet_slugs)
        if (!bets) return

        matchesArray.push({
          ...match,
          status: matchInfo.status,
          totalAmount: matchInfo.totalAmount,
          betSlugsAmountTotal: bets.betSlugsAmountTotal,
          winningBetsSlugs: matchInfo.winningBetSlugs,
          allBets: bets.allBets,
          myBets: bets.myBets,
        })
      }

      setMatches(matchesArray)
    })()
  }, [contract, sport])

  return React.useMemo(
    () => ({
      matches,
      onAddMatch: handleAddMatch,
      onUpdateMatches: handleUpdateMatches,
    }), [matches])
}

export default useMatches
