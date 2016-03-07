var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var secret = 'YOUR_SECRET_ID';
var param = '?client_id=' + id + '&client-secret=' + secret;

// returns a promis
function getUserInfo (username) {
  //axios.get('https://api.github.com/users/' + username + param);
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  getPlayersInfo: function (players) {
    // get data from gh with axios
    // when `all` request have resolved (takes an array) `then` getUserInfo
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    }))
    .then(function (info) {
      console.log(info);
    })
  }
};

module.exports = helpers;

