import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Home extends React.Component {
  render() {
    return (
      <div className = "container home-cont">
        <h1>Github Battle</h1>
        <h3>Battle your friends... and stuff!</h3>

        <div className="col-6 offset-md-3">
          <Link className="btn btn-outline-secondary btn-block btn-lg" to="/battle">BRING IT ON!</Link>
        </div>
      </div>
    )
  }
}

module.exports = Home;