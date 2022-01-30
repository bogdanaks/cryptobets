import React from 'react'
import cn from 'classnames'

import { MatchInfoWithBets, StatusMatch } from '@interfaces/match'

import useWeb3 from '@hooks/useWeb3'
import useMatches from '@hooks/useMatches'
import { getStatusById } from '@web3-help/match-contract'
import Big from 'bignumber.js'
import { formatEther } from 'ethers/lib/utils'
import Button from '@components/ui/button'
import AmountBlock from './components/amount-block'

import styles from './styles.module.scss'

const MyBet = () => {
  const { contract, provider } = useWeb3()
  const { matches } = useMatches()

  const handleWithdrawClick = async (match: MatchInfoWithBets) => {
    if (!window.ethereum || !provider || !contract) return

    await contract.withdraw(match.id, {
      gasPrice: await provider.getGasPrice(),
    })
  }

  const isAlreadyWithdrawWinningBets = React.useCallback((match: MatchInfoWithBets) => {
    const isHasWithdrawWinning = match.myBets.map((bet) => {
      if (!match.betSlugsAmountTotal[bet.slug].isZero()) return bet
    }).filter((i) => i)

    return !!isHasWithdrawWinning.length
  }, [matches])

  const isActiveWithdraw = React.useCallback((match: MatchInfoWithBets) => {
    if (match.status === StatusMatch.NOT_STARTED) return false

    const isHasWinningBets = match.myBets.map((bet) => {
      if (match.winningBetsSlugs.includes(bet.slug)) return bet
    }).filter((i) => i)

    if (!isHasWinningBets.length && match.status !== 3) return false

    return isAlreadyWithdrawWinningBets(match)
  }, [matches, isAlreadyWithdrawWinningBets])

  if (!matches.length) {
    return (
      <div className={styles.wrapper}>
        <span>No bets</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {matches.map((match) => {
        if (!match.myBets.length) return
        return (
          <div className={styles.matchWrapper} key={match.id}>
            <div className={styles.matchWrapper__head}>
              <h3 className={styles.matchWrapper__head__title}>{match.title}</h3>
              <span>Status: <span className={styles[`status${match.status}`]}>{getStatusById(match.status)}</span></span>
            </div>
            <ul className={styles.matchWrapper__betsList}>
              <span className={styles.matchWrapper__betsList__label}>Bets:</span>
              {match.myBets.map((bet, index) => (
                <li className={styles.matchWrapper__betsList__li} key={index}>
                  <span>{bet.slug.split(':')[1].toUpperCase()} | {new Big(formatEther(bet.amount)).precision(7).toString()} ETH</span>
                </li>
              ))}
              <div className={styles.withdrawBlock}>
                <ul className={styles.withdrawBlock__ul}>
                  {match.myBets.map((bet, index) => (
                    <AmountBlock key={index} match={match} bet={bet} />
                  ))}
                </ul>
              </div>
            </ul>
            <div className={styles.buttonWithdrawBlock}>
              <Button
                title="Withdraw"
                onButtonClick={() => handleWithdrawClick(match)}
                className={cn(styles.buttonWithdraw, {
                  [styles.isActive]: isActiveWithdraw(match)
                })}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyBet
