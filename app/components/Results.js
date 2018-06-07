import React from 'react';
import queryString from 'query-string';
// import PropTypes from 'prop-types';
import { BrowserRouter as Link } from 'react-router-dom';
import api from '../utils/api';


class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);  // returns {playerOneName: "nameString", playerTwoName: "nameString2"}
    console.log(players);
    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then(function(results){
      console.log(results);
      if (results === null) {  // catch error if error
        return this.setState(function() {
          return {
            error: "Looks like there was an error. Try again!",
            loading: false,
          };
        });
      }
      this.setState(function() {  // if no error, do this
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
        };
      });
    }.bind(this));  // so right _this_ is used
  }
  
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return (
        <div className="container home-cont">
          <h3>Loading...</h3>
        </div>
      )
    }

    if (error) {
      return (
        <div className="container home-cont">
          <p>{error}</p>
          {/* <Link to='/battle'>Reset</Link> */}
        </div>
      )
    }

    return (
      <div className="home-cont">
        <h1>Results</h1>
        <p>{JSON.stringify(this.state, null, 2)}</p>
      </div>
    );
  }
}

module.exports = Results;