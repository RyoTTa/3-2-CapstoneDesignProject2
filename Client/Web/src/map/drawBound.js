import React from "react";
import { NaverMap, Polyline, Marker } from "react-naver-maps";
import BoundData from "./data/boundData.json";

function drawBound() {
  return (
    <div className="bound">
      {BoundData.position.map((data) => {
        return (
          //<Marker key={data.lat} position={{ lat: data.lat, lng: data.lng }} />
          <Polyline position={{ lat: data.lat, lng: data.lng }}></Polyline>
        );
      })}
    </div>
  );
}

export default drawBound;
