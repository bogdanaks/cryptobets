import React from 'react'
import { BigNumber } from 'ethers'
import { observer } from 'mobx-react-lite'

import { Team } from '@interfaces/match'
import BetStore from '@stores/bet'

import styles from './styles.module.scss'
import { formatEther } from 'ethers/lib/utils'

interface BetRowBodyProps {
  matchId: string
  teamOne: Team
  teamTwo: Team
  availableBetSlugs: string[]
  betSlugsAmountTotal: { [slug: string]: BigNumber }
}

const BetRowBody: React.FC<BetRowBodyProps> = observer(({
  matchId,
  teamOne,
  teamTwo,
  availableBetSlugs,
  betSlugsAmountTotal,
}) => {
  const handleWonClick = async (
    slug: string,
  ) => {
    await BetStore.setBetSelected({
      matchId,
      teamOne: {
        id: teamOne.id,
        name: teamOne.name,
        slug: teamOne.slug,
      },
      teamTwo: {
        id: teamTwo.id,
        name: teamTwo.name,
        slug: teamTwo.slug,
      },
      selectedSlug: slug,
      availableBetSlugs,
      betSlugsAmountTotal,
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowHead}>
        <span className={styles.rowHead__team}>{teamOne.name}</span>
        <span className={styles.rowHead__vs}>VS</span>
        <span className={styles.rowHead__team}>{teamTwo.name}</span>
      </div>
      <div className={styles.containerBets}>
        {availableBetSlugs.map((slug) => (
          <button key={slug} className={styles.wonBtn} onClick={() => handleWonClick(slug)}>
            <span className={styles.wonBtn__title}>{slug.split(':')[1].toUpperCase()}</span>
            <span>{formatEther(betSlugsAmountTotal[slug])} ETH</span>
          </button>
        ))}
      </div>
    </div>
  );
})

export default BetRowBody
