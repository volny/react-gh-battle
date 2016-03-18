import React, { Component } from 'react'

import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers'


export default class ConfirmBattleContainer extends Component {
  constructor () {
    super()
    this.state =  {
      isLoading: true,
      playersInfo: []
    }
  }
  // code using promises - see for the updated version using wait/async below
  //componentDidMount () {
  //  const { query } = this.props.location
  //  getPlayersInfo([query.playerOne, query.playerTwo])
  //  .then((players) => {
  //    this.setState({
  //      isLoading: false,
  //      playersInfo: [players[0], players[1]]
  //    })
  //  })
  //}
  async componentDidMount () {
    try {
      const { query } = this.props.location
      const players = await getPlayersInfo([query.playerOne, query.playerTwo])
      this.setState({
        isLoading: false,
        playersInfo: [players[0], players[1]]
      })
    } catch (err) {
      console.warn('Error in ConfirmBattleContainer', err)
    }
  }
  handleInitiateBattle () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  }
  render () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={() => this.handleInitiateBattle()}
        playersInfo={this.state.playersInfo} />
    )
  }
}

ConfirmBattleContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
