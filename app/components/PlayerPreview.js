import React from "react";
import PropTypes from "prop-types";


function PlayerPreview(props) {
  return (
    <div>
      <div className="col-6 text-center mx-auto">
        <img
          className="avatar img-responsive"
          src={props.avatar}
          alt={'Avarar for ' + props.username}
        />
        <h2>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;