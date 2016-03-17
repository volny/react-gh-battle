import React from 'react'

import Results from '../components/Results'
import { battle } from '../utils/githubHelpers'

export default React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      scores: []
    }
  },
  componentDidMount: function() {
    battle(this.props.location.state.playersInfo)
    .then(function(scores) {
      this.setState({
        scores: scores,
        isLoading: false
      })
    }.bind(this))
  },
  render: function() {
    return (
      <Results
      isLoading={this.state.isLoading}
      playersInfo={this.props.location.state.playersInfo}
      scores={this.state.scores} />
    )
  }
})
