import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import DrawMarker from "./drawMarker";
import MenuBar from "../menuBar/menuBar";
import HomeImg from "../menuBar/icon/home.png";
import MapImg from "../menuBar/icon/map_black.png";
import CalImg from "../menuBar/icon/calendar.png";
import LogoutImg from "../menuBar/icon/logout.png";
import CamImg from "../menuBar/icon/camera.png";

const drawMap = () => {
  const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;

  return (
    <RenderAfterNavermapsLoaded ncpClientId={"pg43l9dp5c"}>
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"}
        style={{
          width: "100%",
          height: "100vh",
        }}
        defaultCenter={{ lat: 35.889845, lng: 128.6105 }}
        defaultZoom={17}
      >
        <DrawMarker />;
      </NaverMap>
      <MenuBar
        homeImg={HomeImg}
        mapImg={MapImg}
        chartImg={CalImg}
        camImg={CamImg}
        logoutImg={LogoutImg}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default drawMap;
