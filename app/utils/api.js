const axios = require('axios');
import Secrets from './secrets';

let id = Secrets.id;  // if required from github
let secret = Secrets.secret;  // if required from github
let params = "?client_id=" + id + "&client_secret=" + secret;
let url = "http://api.github.com/users/";


// logic for getting user info for the battle page
function getProfile(username) {
  return axios.get(url + username + params)  // + params if needed
    .then(function(user){
      return user.data;
    });
}

function getRepos(username) {
  return axios.get(url + username + '/repos' + params + '&per_page=100');
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo) {  // use reduce to return a single number - iterates over all numbers
    return count + repo.stargazers_count;
  }, 0);
}

// logic to calculate the score used to judge profiles
function calculateScore(profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  if (profile.login === 'bildungsroman') {  // the developer always wins :)
    return 1000000;
  }

  return (followers * 3) + totalStars;
}

function handleError(error) {  // called if error occurs during API call
  console.warn(error);
  return null;
}

// uses previous functions together to get all user data
function getUserData(player) {
  return axios.all([  // takes in an array of promises, and only calls .then function after they have all been resolved - asynchronous
    getProfile(player),
    getRepos(player)
  ]).then(function(data){
    let profile = data[0];
    let repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {  // sorts players by score into array - arr[0] has higher score
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

// methods for interacting with an external api
module.exports = {
  battle: function(players){  // where the logic for fetching github profiles goes
    return axios.all(players.map(getUserData))  // returns promise & when resolved, it will have all of the players' info
      .then(sortPlayers)  // then returned array gets sorted by highest score
      .catch(handleError);  // if there's an error, handle it
  },
  fetchPopularRepos: function (language) {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    // searches for types of repos based on language
    return axios.get(encodedURI) // gets a promise
      .then((response) => response.data.items);
  }
};


// usage:
// fetchPopularRepos('Python')
//   .then(function(res) {
//   })