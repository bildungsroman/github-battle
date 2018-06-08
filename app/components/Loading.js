import React from "react";
import PropTypes from "prop-types";


// creating a highly reusable component
class Loading extends React.Component {
  constructor(props) {
    super();

    this.state = {
      text: props.text
    };
  }

  componentDidMount() {
    let stopper = this.props.text + '....';
    this.interval = window.setInterval(function(){
      if (this.state.text === stopper) {
        this.setState(function(){
          return {
            text: this.props.text 
          };
        });
      } else {
        this.setState(function(prevState){
          return {
            text: prevState.text + '.'
          };
        });
      }
    }.bind(this), this.props.speed);  // pass proper _this_. reset every 300ms
  }

  componentWillUnmount() {  // so interval not continuously running and taking up memory
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container home-cont">
        <h3>{this.state.text}</h3>
      </div>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};


module.exports = Loading;