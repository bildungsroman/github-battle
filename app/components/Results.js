import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Loading from './Loading';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';


function Profile(props) {  // called from Player function
  let info = props.info;

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login} >
      {/* everything below rendered as props.children */}
      <ul className="list-group list-group-flush">
        {info.name && <li className="list-group-item text-light bg-dark">{info.name}</li>}  {/* only shown if exists */}
        {info.location && <li className="list-group-item text-light bg-dark">{info.location}</li>}  {/* only shown if exists */}
        {info.company && <li className="list-group-item text-light bg-dark">{info.company}</li>}  {/* only shown if exists */}
        <li className="list-group-item text-light bg-dark">Followers: <span className="badge badge-secondary badge-pill">{info.followers}</span></li>
        <li className="list-group-item text-light bg-dark">Following: <span className="badge badge-secondary badge-pill">{info.following}</span></li>
        <li className="list-group-item text-light bg-dark">Public repos: <span className="badge badge-secondary badge-pill">{info.public_repos}</span></li>
        {info.blog && <li className="list-group-item bg-dark"><a href={info.blog} target="_blank">{info.blog}</a></li>}  {/* only shown if exists */}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}


function Player(props) {  // stateless functional component => takes props, returns UI
  return (
    <div>
      <h2>{props.label}</h2>
      <h4>Score: {props.score}</h4>
      <Profile info={props.profile} />
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
        <Loading />
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
        <div className="col-6 offset-md-3">
          <a className="btn btn-outline-secondary btn-block btn-lg" href="/battle">AGAIN!</a>
        </div>
      </div>
    );
  }
}

module.exports = Results;