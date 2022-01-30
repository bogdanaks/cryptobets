import React from 'react'
import cn from 'classnames'
import Header from '@components/ui/header'
// import useWeb3 from '@hooks/useWeb3'
import WalletStore from '@stores/wallet'
import { observer } from 'mobx-react-lite'

import Button from '@components/ui/button'
import styles from './styles.module.scss'
import MyBet from './components/my-bets'

enum ProfileTabs {
  MY_BETS = 'MY_BETS',
  OTHERS = 'OTHERS',
  NFTS = 'NFTS',
}

const ProfilePage = observer(() => {
  // const { isMetaMaskConnected, address, chainId, balance } = useWeb3()
  const [activeTab, setActiveTab] = React.useState(ProfileTabs.MY_BETS)

  const handleConnectClick = () => {
    //
  }

  const handleTabClick = (tab: ProfileTabs) => {
    setActiveTab(tab)
  }

  if (!WalletStore.getAddress) {
    return (
      <div>
        <Header />
        <div className={styles.emptyContainer}>
          <Button title="Connect Wallet" onButtonClick={handleConnectClick} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <ul className={styles.tabs}>
          <li
            className={cn(styles.tabs__tab, { [styles.active]: activeTab === ProfileTabs.MY_BETS })}
            onClick={() => handleTabClick(ProfileTabs.MY_BETS)}
          >
            My bets
          </li>
        </ul>
        <MyBet />
      </div>
    </div>
  )
})

export default ProfilePage
