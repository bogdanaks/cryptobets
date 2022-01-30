import React from 'react'
import styles from '../styles.module.scss'
import { Contract, ethers } from 'ethers'
import config from '@config'
import MatchABI from '@contracts/Match.json'
import { Match } from '@contracts/Match'
import { formatEther, parseEther } from 'ethers/lib/utils'

const FormBidContract = () => {
  const [bidAmount, setBidAmount] = React.useState("0")
  const [createMatch, setCreateMatch] = React.useState({
    id: 1,
    title: "Title",
    sportSlug: "cs-go",
    matchSlug: "esl-2101",
    beginAt: 123123123,
    endAt: 123123123,
    matchType: "best_of_3",
    teamOne: {
      id: 1,
      name: "Team 1",
      slug: "team-1",
    },
    teamTwo: {
      id: 2,
      name: "Team 2",
      slug: "team-2",
    },
    status: 0,
    winnerId: 0,
    totalAmount: 0,
  })

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value)
  }

  const handleGetBetsClick = async (e) => {
    e.preventDefault()
    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractFactory = new Contract(config.FACTORY_ADDRESS, MatchFactoryABI.abi, signer) as MatchFactory
    const matchFirstAddress = (await contractFactory.getAllMathes())[0]
    const contractMatch = new Contract(matchFirstAddress, MatchABI.abi, signer) as Match
    const bets = await contractMatch.getBets()
    console.log('bets: ', bets)
    bets.forEach((bet) => console.log(`Slug: ${bet.slug} | Amount ${formatEther(bet.amount)}\n`))
  }

  const handlePayBid = async (e) => {
    e.preventDefault()
    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const addressMe = await signer.getAddress()
    const contractFactory = new Contract(config.FACTORY_ADDRESS, MatchFactoryABI.abi, signer) as MatchFactory
    const matchFirstAddress = (await contractFactory.getAllMathes())[0]
    const contractMatch = new Contract(matchFirstAddress, MatchABI.abi, signer) as Match
    ;(await contractMatch.getBets()).forEach((bet) => console.log(`Slug: ${bet.slug} | Amount ${formatEther(bet.amount)}\n`))

    await contractMatch.placeBid('won-1', {
      from: addressMe,
      gasPrice: await provider.getGasPrice(),
      value: parseEther(bidAmount),
    })

    const newBets = await contractMatch.getBets()
    console.log('newBets: ', newBets)
  }

  return (
    <div className={styles.testCreateMatch}>
      <form action=""  className={styles.testCreateMatch__form}>
        <input type="text" value={bidAmount} onChange={handleBidAmountChange} />
        <div>
          <button onClick={handleGetBetsClick} style={{ marginRight: '10px' }}>Get bets</button>
          <button onClick={handlePayBid}>Place Bid</button>
        </div>
      </form>
    </div>
  )
}

export default FormBidContract
