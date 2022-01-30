import React from 'react'
import styles from '../styles.module.scss'
import { Contract, ethers } from 'ethers'
import config from '@config'
import MatchABI from '@contracts/Match.json'
import { Match } from '@contracts/Match'

const FormWithdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = React.useState("0")

  const handleWithdrawl = async (e) => {
    e.preventDefault()
    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractFactory = new Contract(config.FACTORY_ADDRESS, MatchFactoryABI.abi, signer) as MatchFactory
    const matchFirstAddress = (await contractFactory.getAllMathes())[0]
    const contractMatch = new Contract(matchFirstAddress, MatchABI.abi, signer) as Match

    await contractMatch.withdraw({
      gasPrice: await provider.getGasPrice(),
    })

    const newBets = await contractMatch.getBets()
    console.log('newBets: ', newBets)
  }

  return (
    <div className={styles.testCreateMatch}>
      <form action=""  className={styles.testCreateMatch__form}>
        <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
        <button onClick={handleWithdrawl}>Withdraw</button>
      </form>
    </div>
  )
}

export default FormWithdraw
