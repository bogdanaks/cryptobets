import { addChain } from './add-chain'
import { RpcError } from '../interfaces/rpc-error'
import { ethers, utils } from 'ethers'

export async function changeChain(chainId: number): Promise<void> {
  if (!window.ethereum) return
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const hexChainId = utils.hexValue(chainId)

  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: hexChainId }])
  } catch (err) {
    console.log(err)
    const error = err as RpcError
    if (error.code === 4902) { // code: chain doest find, first add network
      await addChain({
        chainId,
        chainName: 'Polygon Testnet(Mumbai)',
        rpcUrls: ['https://rpc-mumbai.matic.today'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        nativeCurrency: {
          name: 'MATIC',
          decimals: 18,
          symbol: 'MATIC',
        }
      })
    }
  }
}
