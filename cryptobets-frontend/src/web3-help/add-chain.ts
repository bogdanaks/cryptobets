import Web3 from 'web3'
import { toHex } from 'web3-utils'
import { RpcError } from '../interfaces/rpc-error'

interface IAddChain {
  chainId: number
  chainName: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
}

export async function addChain({
  chainId,
  chainName,
  rpcUrls,
  blockExplorerUrls,
  nativeCurrency,
}: IAddChain) {
  const provider = Web3.givenProvider
  const hexChainId = toHex(chainId)

  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: hexChainId,
        chainName,
        rpcUrls,
        blockExplorerUrls,
        nativeCurrency,
      }],
    })
  } catch (err) {
    const error = err as RpcError
    if (error.code === -32602) {
      console.error(`Incorrect request params`)
    }
  }
}
