import React from 'react'

import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return {
      isLoading: true,
      playersInfo: []
    }
  },
  componentDidMount () {
    const { query } = this.props.location
    getPlayersInfo([query.playerOne, query.playerTwo])
    .then((players) => {
      this.setState({
        isLoading: false,
        playersInfo: [players[0], players[1]]
      })
    })
  },
  handleInitiateBattle () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  },
  render () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo} />
    )
  }
})
