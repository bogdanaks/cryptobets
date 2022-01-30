import React from 'react'
import { MatchInfo } from '@interfaces/match'

import BetRowHeader from './bet-row-header'
import BetRowBody from './bet-row-body'

import styles from './styles.module.scss'

interface BetRowProps {
  match: MatchInfo
}

const BetRow: React.FC<BetRowProps> = ({ match }) => {
  if (!match.betSlugsAmountTotal) {
    return (
      <span>Loader...</span>
    )
  }

  return (
    <div className={styles.wrapper}>
      <BetRowHeader slug={match.sport_slug} title={match.title} beginAt={match.begin_at} />
      <BetRowBody
        matchId={match.id}
        teamOne={match.team_one}
        teamTwo={match.team_two}
        availableBetSlugs={match.available_bet_slugs}
        betSlugsAmountTotal={match.betSlugsAmountTotal}
      />
    </div>
  )
}

export default BetRow
