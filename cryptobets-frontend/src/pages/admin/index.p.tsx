import React from 'react'
import Header from '@components/ui/header'

import FormBidContract from './components/form-bid-contract'
import FormWithdraw from './components/form-withdraw'

import styles from './styles.module.scss'

const AdminPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <FormBidContract />
        <FormWithdraw />
      </div>
    </div>
  )
}

export default AdminPage
