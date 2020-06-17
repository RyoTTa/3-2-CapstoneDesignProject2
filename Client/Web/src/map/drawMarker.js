import React from "react";
import { Marker } from "react-naver-maps";
import MarkerData from "./data/markerData.json";
import MarkerImg from "./markerImage/black_pin.png";
import { Link } from "react-router-dom";

class drawMarker extends React.Component {
  render() {
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
}

export default drawMarker;
