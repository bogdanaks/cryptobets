import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { getIsMetamaskConnected } from '@utils/local-storage'
import config from '@config'

export async function checkMetamaskConnected(): Promise<boolean> {
  const web3 = new Web3(config.PROVIDER_URL)
  const provider = await detectEthereumProvider()
  if (provider) {
    const accounts = await web3.eth.getAccounts()
    const lsIsMSConnected = getIsMetamaskConnected()
    return lsIsMSConnected && accounts.length > 0
  } else {
    console.log('Please install MetaMask')
    return false
  }
}
