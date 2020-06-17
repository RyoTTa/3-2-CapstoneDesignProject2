import React from "react";
import PropTypes from "prop-types";

class hoverEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
    };
  }

  handleClick = (e) => {
    this.props.onClick(e);
  };

  mouseOver = () => {
    this.setState({ src: this.props.hoverSrc });
  };

  mouseOut = () => {
    this.setState({ src: this.props.src });
  };

  render() {
    return (
      <img
        src={this.state.src}
        style={this.props.style}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        onClick={this.handleClick}
        className={this.props.className}
      />
    );
  }
}

hoverEvent.PropTypes = {
  hoverSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default hoverEvent;
