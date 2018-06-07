import React from "react";
import { BrowserRouter as Link, NavLink } from "react-router-dom";  // use NavLink if you want to change the style of the link as user navigates
// import { LinkContainer } from 'react-router-bootstrap';  // for styling

// stateless functional component b/c no state and no lifecycle needed
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to='/'><i className="fab fa-github-alt"></i></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to='/'>Home</NavLink> 
            {/* add exact so home only bolded when exactly at / */}
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to='/battle'>Battle</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to='/popular'>Popular</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Nav;
