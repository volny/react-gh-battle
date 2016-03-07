var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var GithubHelpers = require('../utils/githubHelpers');


var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      isLoading: true,
      playerInfo: []
    }
   // returns a promise
},
  componentDidMount: function() {
    // see PromptContainer.js / handleSubmitUser
    var query = this.props.location.query;
    // fetch info from Github then update state
    GithubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])

  },
  render: function() {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    );
  }
});

module.exports = ConfirmBattleContainer;

