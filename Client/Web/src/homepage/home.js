import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

import mapBefore from "../menuBar/icon/map.png";
import calBefore from "../menuBar/icon/calendar.png";
import camBefore from "../menuBar/icon/camera.png";
import mapDes from "./image/mapImg.png";
import calDes from "./image/calImg.png";
import camDes from "./image/camImg.png";
import empty from "./image/emptyImg.png";

class homepage extends React.Component {
  componentDidMount() {
    this.mouseOver = (imgSrc) => {
      document.getElementById("desImg").src = imgSrc;
    };

    this.mouseOut = () => {
      document.getElementById("desImg").src = empty;
    };
  }

  render() {
    return (
      <div className="title">
        <h2>Smoking Detection System</h2>
        <table>
          <td className="img_td">
            <Link to={"/drawMap"}>
              {" "}
              <img
                src={mapBefore}
                className="icon"
                onMouseOver={() => this.mouseOver(mapDes)}
                onMouseOut={() => this.mouseOut()}
              />
            </Link>
          </td>
          <td className="img_td">
            <Link to={"/CamChart"}>
              <img
                src={calBefore}
                className="icon"
                onMouseOver={() => this.mouseOver(calDes)}
                onMouseOut={() => this.mouseOut()}
              />
            </Link>
          </td>
          <td className="img_td">
            <Link to={"/addCamera"}>
              <img
                src={camBefore}
                className="icon"
                onMouseOver={() => this.mouseOver(camDes)}
                onMouseOut={() => this.mouseOut()}
              />
            </Link>
          </td>
        </table>
        <p />
        <p />
        <div className="description">
          <img src={empty} id="desImg" />
        </div>
      </div>
    );
  }
}

export default homepage;
