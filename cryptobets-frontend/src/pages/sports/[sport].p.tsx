import React from 'react'
import { useRouter } from 'next/router'

import Header from '@components/ui/header'
import LeftSidebar from './components/left-sidebar'
import MatchesList from './components/matches-list'
import RightSidebar from './components/right-sidebar'

import styles from './styles.module.scss'

const SportPage = () => {
  const router = useRouter()
  const { sport } = router.query

  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.container}>
        <LeftSidebar sport={String(sport)} />
        <div className={styles.middle}>
          <MatchesList sport={String(sport)} />
        </div>
        <div className={styles.rightSidebar}>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default SportPage
