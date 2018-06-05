const React = require('react');
const Popular = require('./Popular');
// main parent component

class App extends React.Component {
	render() {
		return (
			<div className='container'>
					<Popular />
			</div>
		)
	}
}


// export app so it can be used in index.js
module.exports = App;