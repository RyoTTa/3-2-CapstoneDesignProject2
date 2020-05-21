import React from "react";

class markers extends React.Component {
  render() {
    return (
      <Marker
        key={1}
        position={new navermaps.LatLng(35.87, 128.6)}
        animation={2}
        onClick={() => {
          document.location.href = "http://www.naver.com/";
        }}
      />
    );
  }
}

export default markers;
