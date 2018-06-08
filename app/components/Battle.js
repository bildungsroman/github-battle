import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Route, Link } from "react-router-dom";
import PlayerPreview from './PlayerPreview';


class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);  // because using _this_ below
    this.handleSubmit = this.handleSubmit.bind(this);  // always use bind when using classes!!
  }

  handleChange(event) {  // on change, updates state of input field
    let value = event.target.value;  // gets value from input 

    this.setState(function() {
      return {
        username: value
      }; 
    });
  }

  handleSubmit(event) {
    event.preventDefault();  // stops page refresh

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
      // handles what happens when submit clicked
      <form onSubmit={this.handleSubmit}>  
          <label htmlFor="username"><h1>{this.props.label}</h1></label>
          <input 
            type="text"
            className="form-control"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}  // changes as user types
            onChange={this.handleChange}  // function that handles user input
          />
        <button 
          type="submit"
          className="btn btn-outline-secondary btn-block btn-lg"
          disabled={!this.state.username}  // disabled if no username
        >
        Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


class Battle extends React.Component {
  constructor(props) {  // define state here
    super(props);  // always in constructor function

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);  // in order to get right _this_ below
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {  // because bound, _this_ always refers to correct instance
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;  // very important - doesn't work without!
    });
  }

  handleReset(id) {
    this.setState(function(){
      let newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;  // very important - doesn't work without!
    })
  }

  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;
    
    return (
      <div className="container home-cont">
        <div className="row">
          <div className="col-xs-6 col-6">
            {!playerOneName &&  // if this is truthy, do this - shorthand
              <PlayerInput 
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}  // passes all of these things as props to handleSubmit
            />}
            {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
            {/* button passed as props.children! */}
            <button className="reset" onClick={this.handleReset.bind(null, 'playerOne')}>Reset</button>   {/* // null b/c context already set */}
            </PlayerPreview>}
          </div>
          <div className="col-xs-6 col-6">
            {!playerTwoName &&  // managing state instead of in handleSubmit method
              <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}  // passes all of these things as props to handleSubmit
            />}
            {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
            {/* button passed as props.children! */}
            <button className="reset" onClick={this.handleReset.bind(null, 'playerTwo')}>Reset</button>   {/* // null b/c context already set */}
            </PlayerPreview>}
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-md-4">
          {playerOneImage && playerTwoImage &&
            <Link
              className="btn btn-outline-secondary btn-block btn-lg"
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
              }}>TO THE DEATH!</Link>}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Battle;