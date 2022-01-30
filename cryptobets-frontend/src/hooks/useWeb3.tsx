import React from 'react'
import { ethers } from 'ethers'
import { getIsMetamaskConnected } from '@utils/local-storage'
import { Web3Provider } from '@ethersproject/providers'
import config from '@config'
import MatchABI from '@contracts/Match.json'
import { Match } from '@contracts/Match'

interface IWeb3Data {
  provider: null | Web3Provider
  address: null | string
  balance: null | string
  chainId: null | number
  isMetaMaskConnected: boolean
  contract: null | Match
}

const useWeb3 = () => {
  const [web3Data, setWeb3Data] = React.useState<IWeb3Data>({
    provider: null,
    address: null,
    balance: null,
    chainId: null,
    isMetaMaskConnected: false,
    contract: null,
  })

  React.useEffect(() => {
    ;(async () => {
      if (!window.ethereum) return

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        await window.ethereum.enable() // TODO check this

        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const balanceHex = await signer.getBalance()
        const balanceValue = ethers.utils.formatEther(balanceHex)
        const network = await provider.getNetwork()
        const contract = new ethers.Contract(config.FACTORY_ADDRESS, MatchABI.abi, signer) as Match

        const lsIsMSConnected = getIsMetamaskConnected()

        setWeb3Data({
          provider,
          isMetaMaskConnected: lsIsMSConnected && !!address,
          address,
          balance: balanceValue,
          chainId: network.chainId,
          contract,
        })
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return React.useMemo(
    () => ({
    provider: web3Data.provider,
    address: web3Data.address,
    balance: web3Data.balance,
    chainId: web3Data.chainId,
    isMetaMaskConnected: web3Data.isMetaMaskConnected,
    contract: web3Data.contract,
    }), [web3Data])
}

export default useWeb3
