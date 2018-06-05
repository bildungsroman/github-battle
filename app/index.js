import React from "react";
import ReactDOM from "react-dom";
// const PropTypes = require('prop-types');
require('./index.css');
// move logic to components, use index.js only  to render
const App = require('./components/App');



ReactDOM.render(
	<App />,
	document.getElementById('app')
);