import React from 'react'
import Header from '@components/ui/header'
import InputField from '@components/ui/input-field'
import useWeb3 from '@hooks/useWeb3'

import styles from './styles.module.scss'
import { getMatchesList } from '@web3-help/match-contract'

const MatchesPage = () => {
  const { contract } = useWeb3()
  const [matchInfo, setMatchInfo] = React.useState({
    id: 1,
    status: 0,
    totalAmount: 0,
    availableBetSlugs: ["won:won-1", "won:won-2"],
    winningBetSlugs: [],
    isExist: true,
  })

  const handleMatchChange = (e) => {
    setMatchInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleWinningBetSlugsChange = (e) => {
    if (e.target.value) {
      const arrStrings = e.target.value.split(',')
      setMatchInfo(prevState => ({ ...prevState, winningBetSlugs: arrStrings }))
    } else {
      setMatchInfo(prevState => ({ ...prevState, winningBetSlugs: [] }))
    }
  }

  const handleCreateMatch = async (e) => {
    e.preventDefault()
    if (!window.ethereum || !contract) return

    await contract.createMatch(matchInfo)
  }

  const handleUpdateMatch = async (e) => {
    e.preventDefault()
    if (!window.ethereum || !contract) return

    for (const slug of matchInfo.winningBetSlugs) {
      if (!matchInfo.availableBetSlugs.includes(slug)) {
        console.error(`${slug} doesnt exist in availableBetSlugs`)
        return
      }
    }

    // TODO update on server api match
    await contract.updateMatch(matchInfo.id, matchInfo.status, matchInfo.winningBetSlugs)
  }

  const handleGetMatches = async (e) => {
    e.preventDefault()
    if (!window.ethereum || !contract) return

    const matchesArray = await getMatchesList(contract)
    console.log('get Matches: ', matchesArray)
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.testCreateMatch}>
          <form action=""  className={styles.testCreateMatch__form}>
            <InputField label="Id" name="id" value={matchInfo.id} onChange={handleMatchChange} />
            <InputField label="Status" name="status" value={matchInfo.status} onChange={handleMatchChange} />
            <InputField
              label="Winnings Slugs"
              name="winningBetSlugs"
              value={matchInfo.winningBetSlugs.join(',')}
              onChange={handleWinningBetSlugsChange}
            />
            <div className={styles.buttonsBlock}>
              <button className={styles.buttonAction} onClick={handleGetMatches} style={{ marginRight: '10px' }}>Get Matches</button>
              <button className={styles.buttonAction} onClick={handleUpdateMatch} style={{ marginRight: '10px' }}>Update Match</button>
              <button className={styles.buttonAction} onClick={handleCreateMatch}>Create Match</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MatchesPage
