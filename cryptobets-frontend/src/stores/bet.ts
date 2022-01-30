import { makeAutoObservable } from 'mobx'
import { Team } from '@interfaces/match'
import { ethers } from 'ethers'

export interface IBetSelected {
  matchId: string
  teamOne: Team
  teamTwo: Team
  selectedSlug: string
  availableBetSlugs: string[]
  betSlugsAmountTotal: { [slug: string]: ethers.BigNumber }
}

class BetStore {
  protected betSelected: IBetSelected | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get getBetSelected(): IBetSelected | null {
    return this.betSelected
  }

  public setBetSelected(bet: IBetSelected | null): void {
    this.betSelected = bet
  }
}

export default new BetStore()
