var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var Link = require('react-router').Link;
var MainContainer = require('../containers/MainContainer');
var Loading = require('./Loading');

function StartOver (props) {
  return (
    <div className='col-sm-12' style={styles.space}>
      <Link to='/PlayerOne'>
        <button type='button' className='btn btn-lg btn-danger'>Start Over</button>
      </Link>
    </div>
  )
}

function Tie (props) {
  return (
    <MainContainer>
      <h1>It's a tie</h1>
      <StartOver />
    </MainContainer>
  )
}

function Results (props) {
  if (props.isLoading === true) {
    return <Loading text='Battling' speed={300} />
  }

  if (props.scores[0] === props.scores[1]) {
    return (
      <Tie scores={props.scores} playersInfo={props.PlayersInfo}/>
    )
  }

  var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
  var losingIndex = winningIndex === 0 ? 1 : 0;

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

Results.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}

module.exports = Results;

