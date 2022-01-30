import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'

import styles from './styles.module.scss'

interface LeftSidebarProps {
  sport?: string
}

enum ESportsLinks {
  CSGO = 'cs-go',
  DOTA2 = 'dota-2'
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ sport }) => {
  return (
    <div className={styles.leftSidebar}>
      <ul>
        <li className={cn(styles.gameRow, { [styles.active]: sport === ESportsLinks.CSGO })}>
          <Link href={`/sports/${ESportsLinks.CSGO}`}>
            <a>
              <Image src="/assets/images/game-icons/cs-go.svg" alt="CS:GO" width={30} height={30} />
              <span className={styles.gameRow__title}>CS:GO</span>
            </a>
          </Link>
        </li>
        <li className={cn(styles.gameRow, { [styles.active]: sport === ESportsLinks.DOTA2 })}>
          <Link href={`/sports/${ESportsLinks.DOTA2}`}>
            <a>
              <Image src="/assets/images/game-icons/dota2.svg" alt="DOTA 2" width={30} height={30} />
              <span className={styles.gameRow__title}>DOTA 2</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftSidebar
