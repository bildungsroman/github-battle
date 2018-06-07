import React from 'react';
import queryString from 'query-string';
// import PropTypes from 'prop-types';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then(function(results){
      console.log(results);
    });
  }
  
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return <h3>Loading..</h3>
    }

    return (
      <div className="home-cont">
        <h1>Results</h1>

      </div>
    );
  }
}

module.exports = Results;