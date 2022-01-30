import React from 'react'
import BetStore from '@stores/bet'
import BetRow from './components/bet-row'

import { BetInfo, MatchInfo, MatchInfoWithBets } from '@interfaces/match'

import styles from './styles.module.scss'
import useWeb3 from '@hooks/useWeb3'
import { getMatchById } from '@api/cryptobets'
import { BigNumber } from 'ethers'
import Big from 'bignumber.js'
import useMatches from '@hooks/useMatches'

interface MatchesListProps {
  sport?: string
}

const MatchesList: React.FC<MatchesListProps> = ({ sport }) => {
  const { provider, contract } = useWeb3()
  const { matches, onAddMatch, onUpdateMatches } = useMatches(sport)

  React.useEffect(() => {
    ;(async () => {
      if (matches) {
        for (const match of matches) {
          await subscribeEventNewMatch()
        }
        await subscribeEventNewBet(matches)
      }
    })()

    return () => {
      if (!window.ethereum || !contract) return
      contract.removeAllListeners()
    }
  }, [matches, sport])

  const subscribeEventNewMatch = async () => {
    if (!window.ethereum || !provider || !contract) return
    provider.once("block", () => {
      contract.on("NewMatch", async (match: MatchInfo) => {
        await onAddMatch(match)
      })
    })
  }

  const subscribeEventNewBet = async (matchesList: MatchInfoWithBets[]) => {
    if (!window.ethereum || !contract || !provider) return

    provider.once("block", () => {
      contract.on("NewBet", async (matchId: number, bet: BetInfo) => {
        const matchApi = await getMatchById(matchId.toString())

        let betSlugsAmountTotal: { [slug: string]: BigNumber } = {}
        for (const slug of matchApi.available_bet_slugs) {
          betSlugsAmountTotal[slug] = await contract.getMatchAmountTotalBySlug(matchId, slug)
        }

        const newMatchesList = matchesList.map((match) => {
          if (match.id === matchId.toString()) {
            const valTotalAmount = new Big(match.totalAmount._hex).plus(bet.amount._hex)
            const valTotalAmountHex = '0x' + valTotalAmount.toString(16)

            const betSelected = BetStore.getBetSelected
            if (betSelected && betSelected.matchId === matchId.toString()) {
              BetStore.setBetSelected({
                ...betSelected,
                betSlugsAmountTotal,
              })
            }

            return {
              ...match,
              status: match.status,
              totalAmount: BigNumber.from(valTotalAmountHex),
              betSlugsAmountTotal,
              winningBetsSlugs: match.winningBetsSlugs,
              allBets: match.allBets,
              myBets: match.myBets,
            }
          }

          return match
        })

        onUpdateMatches(newMatchesList)
      })
    })
  }

  return (
    <ul className={styles.wrapper}>
      {matches.map((item) => {
        if (item.status !== 0) return
        return (
          <li key={item.id.toString()}>
            <BetRow match={item} />
          </li>
        )
      })}
    </ul>
  )
}

export default MatchesList
