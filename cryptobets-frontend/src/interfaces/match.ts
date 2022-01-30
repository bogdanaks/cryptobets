import { BigNumber, ethers } from 'ethers'
import { GetMatchByIdResponse } from '@api/api-interfaces'

export interface Team {
  id: string
  name: string
  slug: string
}

export enum StatusMatch {
  NOT_STARTED = 0,
  RUNNING = 1,
  FINALIZED = 2,
  CLOSED = 3
}

export type Bet = ([string, string, ethers.BigNumber] & {owner: string, slug: string, amount: ethers.BigNumber})

export interface BetInfo {
  amount: BigNumber
  slug: string
}

export interface MatchInfo extends GetMatchByIdResponse {
  totalAmount: BigNumber
  winningBetsSlugs: string[]
  betSlugsAmountTotal: {
    [slug: string]: BigNumber
  }
}

export interface MatchInfoWithBets extends MatchInfo {
  allBets: Bet[],
  myBets: Bet[],
}
