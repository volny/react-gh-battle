var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var secret = 'YOUR_SECRET_ID';
var param = '?client_id=' + id + '&client-secret=' + secret;

// axios is promises-based, alle these functions return promises
function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars (repos) {
  return repos.data.reduce(function(prev, curr) {
    return prev + curr.stargazers_count
  }, 0);
}

function getPlayersData (player) {
  return getRepos(player.login)
  .then(getTotalStars)
  .then(function(totalStars) {
    return {
      followers: player.followers,
      totalStars: totalStars
    }
  })
}

function calculateScores (players) {
    return [
      players[0].followers * 3 +players[0].totalStars,
      players[1].followers * 3 +players[1].totalStars
    ]
}

var helpers = {
  getPlayersInfo: function (players) {
    // get data from gh with axios
    // when `all` request have resolved (takes an array) `then` getUserInfo
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    }))
    .then(function (info) {
      //console.log(info);
      // look at what github returns us - the stuff we care about is at info.data
      return info.map(function(user) {
        return user.data;
      })
    // best practice to have `.catch` at end of promise chains
    }).catch(function(err) {
      console.warn('Error in getPlayersInfo', err);
    })
  },
  battle: function(players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    // once all promises resolve ...
    return axios.all([playerOneData, playerTwoData])
    .then(calculateScores)
    .catch(function (err) {
      console.warn('Error in getPlayersInfo', err);
    })

  }
};

module.exports = helpers;

