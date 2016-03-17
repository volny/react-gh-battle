import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from '../styles'
import MainContainer from '../containers/MainContainer'
import UserDetails from './UserDetails'
import UserDetailsWrapper from './UserDetailsWrapper'
import Loading from './Loading'

Results.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}

function StartOver () {
  return (
    <div className='col-sm-12' style={styles.space}>
      <Link to='/PlayerOne'>
        <button type='button' className='btn btn-lg btn-danger'>Start Over</button>
      </Link>
    </div>
  )
}

function Tie () {
  return (
    <MainContainer>
      <h1>It's a tie</h1>
      <StartOver />
    </MainContainer>
  )
}

export default function Results (props) {
  if (props.isLoading === true) {
    return <Loading text='Battling' speed={300} />
  }

  if (props.scores[0] === props.scores[1]) {
    return (
      <Tie scores={props.scores} playersInfo={props.PlayersInfo}/>
    )
  }

  const winningIndex = props.scores[0] > props.scores[1] ? 0 : 1
  const losingIndex = winningIndex === 0 ? 1 : 0

  return (
    <MainContainer>
      <h1>Results</h1>
      <div className='col-sm-9 col-sm-offset-2'>
        <UserDetailsWrapper header='Winner'>
          <UserDetails score={props.scores[winningIndex]} info={props.playersInfo[winningIndex]} />
        </UserDetailsWrapper>
        <UserDetailsWrapper header='Loser'>
          <UserDetails score={props.scores[losingIndex]} info={props.playersInfo[losingIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  )
}
