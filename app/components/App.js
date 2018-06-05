import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const Popular = require('./Popular');
// const Battle = require('./Battle');
const Nav = require('./Nav');
// main parent component

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Nav />
				<div  className='container'>
					<Route path='/popular' component={Popular} />
				</div>
				</div>
			</Router>
		)
	}
}


// export app so it can be used in index.js
module.exports = App;