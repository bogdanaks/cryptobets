import React from 'react'
import BetStore from '@stores/bet'
import BigNumber from 'bignumber.js'

import config from '@config'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { observer } from 'mobx-react-lite'

import styles from './styles.module.scss'
import useWeb3 from '@hooks/useWeb3'

const floatRegExp = /^[0-9]*[.]?[0-9]{0,6}$/

const RightSidebar = observer(() => {
  const { provider, contract, address } = useWeb3()

  const [amount, setAmount] = React.useState('1')

  const wonCalculate = React.useMemo(() => {
    if (
      !BetStore.getBetSelected
      || !BetStore.getBetSelected?.betSlugsAmountTotal
    ) return null
    let proportionWonPercent
    let proportionWonAmount
    let wonCoefficient
    let totalAmountSlugsByCategory = '0'
    let totalAmountSlugsOpponents = '0'
    const selectedSlug = BetStore.getBetSelected?.selectedSlug
    const selectedSlugCategory = selectedSlug.split(':')[0]
    const betsAmountTotalBySlugs = BetStore.getBetSelected?.betSlugsAmountTotal
    Object.entries(betsAmountTotalBySlugs).forEach(([categorySlug, slugData]) => {
      if (categorySlug.split(':')[0] === selectedSlugCategory) {
        totalAmountSlugsByCategory = new BigNumber(totalAmountSlugsByCategory).plus(slugData.toString()).toString()

        if (categorySlug.split(':')[1] !== BetStore.getBetSelected?.selectedSlug.split(':')[1]) {
          totalAmountSlugsOpponents += slugData
        }
      }
    })

    const wonAmount = new BigNumber(amount).minus(new BigNumber(amount).dividedBy(100).multipliedBy(config.FEE_PERCENT))
    const betsTotalSelected = new BigNumber(
      formatEther(betsAmountTotalBySlugs[selectedSlug])
    ).plus(wonAmount)

    proportionWonPercent = new BigNumber(wonAmount).multipliedBy(100).dividedBy(betsTotalSelected).toString()
    proportionWonAmount = new BigNumber(formatEther(totalAmountSlugsOpponents)).multipliedBy(proportionWonPercent).dividedBy(100)
    wonCoefficient = new BigNumber(proportionWonAmount).dividedBy(wonAmount).toString()

    proportionWonAmount = proportionWonAmount.minus(new BigNumber(amount).dividedBy(100).multipliedBy(config.FEE_PERCENT))

    return {
      proportionWonPercent,
      proportionWonAmount,
      wonAmount,
      wonCoefficient,
    }
  }, [amount, BetStore.getBetSelected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (floatRegExp.test(e.target.value)) {
      setAmount(e.target.value)
    }
  }

  const handlePlaceBid = async () => {
    if (!window.ethereum || !contract || !BetStore.getBetSelected || !address || !provider) return

    await contract.placeBid(BetStore.getBetSelected.matchId, BetStore.getBetSelected.selectedSlug, {
      from: address,
      gasPrice: await provider.getGasPrice(),
      value: parseEther(amount),
    })
  }

  if (!BetStore.getBetSelected) return null
  return (
      <>
        <div className={styles.ordersBlock}>
          <div className={styles.ordersBlock__info}>
            <span>{BetStore.getBetSelected.teamOne.name} vs {BetStore.getBetSelected.teamTwo.name}</span>
            <span>Bet: <b>{BetStore.getBetSelected.selectedSlug.split(':')[1].toUpperCase()}</b></span>
          </div>
          <div className={styles.ordersBlock__coef}>
            {amount && wonCalculate?.wonCoefficient && (
              <span>x{new BigNumber(wonCalculate?.wonCoefficient).precision(7).toNumber()}</span>
            )}
          </div>
        </div>
        <div className={styles.amountBlock}>
          <span className={styles.amountBlock__label}>Amount: </span>
          <input className={styles.amountBlock__input} type="text" value={amount}
                 onChange={handleInputChange}/>
        </div>
        <div className={styles.commonBlock}>
          <div className={styles.commonBlock__pay}>
            <span>Common: </span>
            <span>{wonCalculate?.wonAmount && new BigNumber(wonCalculate?.wonAmount).precision(7).toString()} ETH</span>
          </div>
          <div className={styles.commonBlock__won}>
            <span>Potential won: </span>
            {amount && wonCalculate?.proportionWonAmount && (
              <span>{new BigNumber(wonCalculate?.proportionWonAmount).plus(amount).precision(7).toString()} ETH</span>
            )}
          </div>
        </div>
        <button className={styles.payBtn} onClick={handlePlaceBid}>Place Bid</button>
      </>
    )
})

export default RightSidebar
