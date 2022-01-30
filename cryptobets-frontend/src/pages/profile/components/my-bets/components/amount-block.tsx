import React from 'react'
import styles from '../styles.module.scss'
import Big from 'bignumber.js'
import { formatEther } from 'ethers/lib/utils'
import { Bet, MatchInfoWithBets, StatusMatch } from '@interfaces/match'
import BetStore from '@stores/bet'
import config from '@config'
import { BigNumber } from 'ethers'

interface AmountBlockProps {
  match: MatchInfoWithBets
  bet: Bet
}

const AmountBlock: React.FC<AmountBlockProps> = ({ match, bet }) => {

  const wonCalculate = React.useCallback((amount: BigNumber) => {
    const amountBig = new Big(amount._hex.toString())
    let proportionWonPercent
    let totalAmountSlugsByCategory = '0'
    let totalAmountSlugsOpponents = '0'
    const selectedSlugCategory = bet.slug.split(':')[0]
    const betsAmountTotalBySlugs = match.betSlugsAmountTotal
    Object.entries(betsAmountTotalBySlugs).forEach(([categorySlug, slugData]) => {
      if (categorySlug.split(':')[0] === selectedSlugCategory) {
        totalAmountSlugsByCategory = new Big(totalAmountSlugsByCategory).plus(slugData.toString()).toString()

        if (categorySlug.split(':')[1] !== bet.slug.split(':')[1]) {
          totalAmountSlugsOpponents += slugData
        }
      }
    })

    const wonAmount = new Big(amountBig).minus(new Big(amountBig).dividedBy(100).multipliedBy(config.FEE_PERCENT))
    const betsTotalSelected = new Big(
      formatEther(betsAmountTotalBySlugs[bet.slug])
    ).plus(wonAmount)

    proportionWonPercent = new Big(wonAmount).multipliedBy(100).dividedBy(betsTotalSelected).toString()

    return new Big(formatEther(totalAmountSlugsOpponents)).multipliedBy(proportionWonPercent).dividedBy(100).plus(formatEther(amountBig.toString()))
  }, [match, bet])

  if (
    match.status === StatusMatch.NOT_STARTED
    || match.status === StatusMatch.RUNNING
  ) {
    return (
      <li>
        <span className={styles.withdrawBlock__wonAmount}>
          Potential won <span className={styles.betCategory}>[{bet.slug.split(':')[1].toUpperCase()}]:</span>{' '}
          {new Big(wonCalculate(match.betSlugsAmountTotal[bet.slug]).toString()).precision(7).toString()} ETH
        </span>
      </li>
    )
  } else {
    return (
      <li>
        <span className={styles.withdrawBlock__wonAmount}>
          {match.status === StatusMatch.FINALIZED ? match.winningBetsSlugs.find(slug => slug === bet.slug)
            ? <span className={styles.winSpan}>WIN </span>
            : <span className={styles.lossSpan}>LOSS </span>
          : null}
          <span className={styles.betCategory}>[{bet.slug.split(':')[1].toUpperCase()}]:</span>{' '}
          {new Big(wonCalculate(bet.amount).toString()).precision(7).toString()} {' '}
          ETH
        </span>
      </li>
    )
  }
}

export default AmountBlock
