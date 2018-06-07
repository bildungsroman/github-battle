import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Results extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="home-cont">
        <h1>Results</h1>

      </div>
    );
  }
}

module.exports = Results;