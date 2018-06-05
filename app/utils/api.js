const axios = require('axios');


// methods for interacting with an external api
module.exports = {
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