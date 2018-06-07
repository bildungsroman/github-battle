import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { BrowserRouter as Link } from 'react-router-dom';
import api from '../utils/api';


function Player(props) {  // stateless functional component => takes props, returns UI
  return (
    <div>
      <h1>{props.label}</h1>
      <h3 className="text-center">Score: {props.score}</h3>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};


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
        <div className="row">
          <div className="col-6">
            <Player 
              label="Winner"
              score={winner.score}
              profile={winner.profile}
            />
          </div>
          <div className="col-6">
            <Player 
              label="Loser"
              score={loser.score}
              profile={loser.profile}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Results;