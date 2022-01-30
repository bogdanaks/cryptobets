import React from 'react'
import dateFormat from 'dateformat'

import styles from './styles.module.scss'
import Image from 'next/image'

interface BetRowHeaderProps {
  slug: string
  title: string
  beginAt: Date
}

const BetRowHeader: React.FC<BetRowHeaderProps> = ({ slug, title, beginAt }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.first}>
        <Image src={`/assets/images/game-icons/${slug.toLowerCase()}.svg`} alt={slug.toUpperCase()} width={25} height={25} />
        <span className={styles.nameBlock}>{title}</span>
      </div>
      <span>{dateFormat(beginAt, "dd mmm HH:MM")}</span>
    </div>
  )
}

export default BetRowHeader
