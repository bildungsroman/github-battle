import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Popular from './Popular';
import Nav from './Nav';
import Footer from './Footer';


// main parent component
class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Nav />
				<div  className='container'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						{/* With switch, if none of the specified routes are found, the default below is shown */}
						<Route render={function(){
							return (
								<div className="container home-cont">
									<h1>Four oh Four!</h1>
									<div className="col-6 offset-md-3">
										<Link className="btn btn-outline-secondary btn-block btn-lg" to="/">BACK TO SAFETY!</Link>
									</div>
								</div>
							)
						}} />
					</Switch>
				</div>
				<Footer />
				</div>
			</Router>
		)
	}
}


// export app so it can be used in index.js
module.exports = App;