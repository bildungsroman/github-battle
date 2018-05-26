const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');

// state
// lifecycle event
// UI

class App extends React.Component {
  render() {  // below is JSX!
    return (
      <div>
        Hello React Training!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
