import React from 'react'

import Header from '@components/ui/header'
import LeftSidebar from './components/left-sidebar'
import MatchesList from './components/matches-list'
import RightSidebar from './components/right-sidebar'

import styles from './styles.module.scss'

const SportPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.container}>
        <LeftSidebar />
        <div className={styles.middle}>
          <MatchesList />
        </div>
        <div className={styles.rightSidebar}>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default SportPage
