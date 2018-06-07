import React from 'react';
import queryString from 'query-string';
// import PropTypes from 'prop-types';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from '../utils/api';


class Results extends React.Component {
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);  // returns {playerOneName: "nameString", playerTwoName: "nameString2"}
  }
  
  render() {
    return (
      <div className="home-cont">
        <h1>Results</h1>

      </div>
    );
  }
}

module.exports = Results;