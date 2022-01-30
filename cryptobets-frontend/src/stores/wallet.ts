import { makeAutoObservable } from 'mobx'

class WalletStore {
  protected address: string | null = null
  protected balance: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get getAddress(): string | null {
    return this.address
  }

  public async setAddress(address: string | null): Promise<void> {
    this.address = address
  }

  get getBalance(): string | null {
    return this.balance
  }

  public async setBalance(balance: string | null): Promise<void> {
    this.balance = balance
  }
}

export default new WalletStore()
