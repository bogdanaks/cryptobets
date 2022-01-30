import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import WalletStore from '@stores/wallet'

import { addIsMetamaskConnected } from '@utils/local-storage'
import useWeb3 from '@hooks/useWeb3'

import styles from './styles.module.scss'
import BigNumber from 'bignumber.js'

const ConnectWalletButton = observer(() => {
  const [isShowMenu, setIsShowMenu] = React.useState(false)
  const { address, balance } = useWeb3()

  const handleButtonClick = async () => {
    try {
      addIsMetamaskConnected(true)

      await WalletStore.setAddress(address)
      await WalletStore.setBalance(balance)
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleDisconnectClick = async () => {
    try {
      addIsMetamaskConnected(false)
      await WalletStore.setAddress(null)
      await WalletStore.setBalance(null)
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleShowClick = () => {
    setIsShowMenu(!isShowMenu)
  }

  if (WalletStore.getAddress && WalletStore.getBalance) {
    return (
      <div className={styles.connectedBlock}>
        <span onClick={handleShowClick}>{new BigNumber(WalletStore.getBalance).toFixed(6)} ETH</span>
        <div className={cn(styles.showContainer, { [styles.isShow]: isShowMenu })}>
          <ul>
            <li>
              <Link href="/profile">
                <a>MY BETS</a>
              </Link>
            </li>
            <li>
              <Link href="/help">
                <a>HELP</a>
              </Link>
            </li>
            <li className={styles.disconnectLi} onClick={handleDisconnectClick}>
              DISCONNECT
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <button className={styles.connectBtn} onClick={handleButtonClick}>
      Connect Wallet
    </button>
  )
})

export default ConnectWalletButton
