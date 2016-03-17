import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { space } from '../styles'
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
    <div className='col-sm-12' style={space}>
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

export default function Results ({isLoading, scores, playersInfo}) {
  if (isLoading === true) {
    return <Loading text='Battling' speed={300} />
  }

  if (scores[0] === scores[1]) {
    return (
      <Tie scores={scores} playersInfo={PlayersInfo}/>
    )
  }

  const winningIndex = scores[0] > scores[1] ? 0 : 1
  const losingIndex = winningIndex === 0 ? 1 : 0

  return (
    <MainContainer>
      <h1>Results</h1>
      <div className='col-sm-9 col-sm-offset-2'>
        <UserDetailsWrapper header='Winner'>
          <UserDetails score={scores[winningIndex]} info={playersInfo[winningIndex]} />
        </UserDetailsWrapper>
        <UserDetailsWrapper header='Loser'>
          <UserDetails score={scores[losingIndex]} info={playersInfo[losingIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  )
}
