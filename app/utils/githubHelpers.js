import axios from 'axios'

const id = 'YOUR_CLIENT_ID'
const secret = 'YOUR_SECRET_ID'
const param = '?client_id=' + id + '&client-secret=' + secret

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

function getTotalStars (repos) {
  return repos.data.reduce((prev, curr) => prev + curr.stargazers_count, 0)
}

//function getPlayersData (player) {
//  return getRepos(player.login)
//  .then(getTotalStars)
//  .then((totalStars) => (
//    {
//      followers: player.followers,
//      totalStars: totalStars
//    }
//  ))
//}
async function getPlayersData (player) {
  try {
    const repos = await getRepos(player.login)
    const totalStars = await getTotalStars(repos)
    return {
      followers: player.followers,
      totalStars
    }
  } catch (err) {
    console.log('Error in githubHelpers', err)
  }
}

function calculateScores (players) {
    return [
      players[0].followers * 3 +players[0].totalStars,
      players[1].followers * 3 +players[1].totalStars
    ]
}

//export function getPlayersInfo (players) {
//  return axios.all(players.map((username) => getUserInfo(username)))
//  .then((info) => info.map((user) => user.data))
//  .catch((err) => { console.warn('Error in getPlayersInfo', err) }) 
//}
export async function getPlayersInfo (players) {
  try {
    const info = await Promise.all(players.map((username) => getUserInfo(username)))
    return info.map((user) => user.data)
  } catch (err) {
    console.log('Error in githubHelpers', err)
  }
}

//export function battle (players) {
//  const playerOneData = getPlayersData(players[0])
//  const playerTwoData = getPlayersData(players[1])
//
//  return axios.all([playerOneData, playerTwoData])
//  .then(calculateScores)
//  .catch((err) => { console.warn('Error in getPlayersInfo', err) })
//}
export async function battle (players) {
  try {
    const playerOneData = getPlayersData(players[0])
    const playerTwoData = getPlayersData(players[1])
    const playersData = await Promise.all([playerOneData, playerTwoData])
    return await calculateScores(playersData)
  } catch (error) {
    console.warn('Error in getPlayersInfo: ', err)
  }
}
