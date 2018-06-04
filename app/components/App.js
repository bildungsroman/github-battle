const React = require('react');
const Popular = require('./Popular');


class App extends React.Component {
    render() {
      return (
        <div>
            <Popular />
        </div>
      )
    }
  }


// export app so it can be used in index.js
  module.exports = App;