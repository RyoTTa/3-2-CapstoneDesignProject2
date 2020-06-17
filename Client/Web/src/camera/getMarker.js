import React from "react";
import { Marker } from "react-naver-maps";
import MarkerImg from "./markerImage/black_pin.png";
import { Link } from "react-router-dom";

class getMarker extends React.Component {
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          res = JSON.parse(xhr.responseText);
          for (var i = 0; i < res.length; i++) {}
        }
      }
    };
  }
}

export default getMarker;

import React from "react";
import { Marker } from "react-naver-maps";
import MarkerData from "./data/markerData.json";
import MarkerImg from "./markerImage/black_pin.png";
import { Link } from "react-router-dom";

function drawMarker() {
  return (
    <div className="marker">
      {MarkerData.markerList.map((data) => {
        return (
          <Marker
            key={data.id}
            position={{ lat: data.lat, lng: data.lng }}
            icon={MarkerImg}
            title={data.name}
          ></Marker>
        );
      })}
    </div>
  );
}

export default drawMarker;
