import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";

class menuBar extends React.Component {
  render() {
    return (
      <div className="iw_inner">
        <Link to={"/"}>
          {" "}
          <img id="image" src={this.props.homeImg} />{" "}
        </Link>

        <Link to={"/drawMap"}>
          <img id="image" src={this.props.mapImg} />
        </Link>
        <Link to={"/DateChart"}>
          <img id="image" src={this.props.chartImg} />
        </Link>
        <Link to={"/addCamera"}>
          <img id="image" src={this.props.camImg} />
        </Link>
        <img id="logout" src={this.props.logoutImg} />
      </div>
    );
  }
}

export default menuBar;
