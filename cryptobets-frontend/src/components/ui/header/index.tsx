import React from 'react'
import Link from 'next/link'

import ConnectWalletButton from '../connect-wallet-button'

import styles from './styles.module.scss'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.logo}>
        <Link href="/">
          <a>CRYPTOBETS</a>
        </Link>
      </span>
      <ul className={styles.links}>
        <li>
          <Link href="/blog">
            <a>BLOG</a>
          </Link>
        </li>
        <li>
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
        </li>
      </ul>
      <ConnectWalletButton/>
    </div>
  )
}

export default Header
