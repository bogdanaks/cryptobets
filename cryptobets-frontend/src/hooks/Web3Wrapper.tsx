import React from 'react'
import useWeb3 from '@hooks/useWeb3'
import WalletStore from '@stores/wallet'

const Web3Wrapper = ({ children }) => {
  const { isMetaMaskConnected, address, chainId, balance } = useWeb3()

  React.useEffect(() => {
    ;(async () => {
      if (!window.ethereum) return
      if (!isMetaMaskConnected) return

      // if (chainId !== 80001) { // TEMPORARY HIDE
      //   await changeChain(80001)
      // }

      await WalletStore.setAddress(address)
      await WalletStore.setBalance(balance)
    })()
  }, [address, balance, isMetaMaskConnected, chainId])

  return (
    <div>
      {children}
    </div>
  )
}

export default Web3Wrapper
