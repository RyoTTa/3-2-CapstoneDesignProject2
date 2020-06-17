import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import MenuBar from "../menuBar/menuBar";
import HomeImg from "../menuBar/icon/home.png";
import MapImg from "../menuBar/icon/map.png";
import CalImg from "../menuBar/icon/calendar.png";
import LogoutImg from "../menuBar/icon/logout.png";
import CamImg from "../menuBar/icon/camera_black.png";

class getLocate extends React.Component {
  componentDidMount() {
    const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.readyState === 200 || xhr.status === 201) {
          alert(xhr.responseText);
        }
      }
    };

    this.clickMap = (e) => {
      var id = "004";
      var lat = e.coord.lat();
      var lng = e.coord.lng();

      alert("lat : " + lat + ", lng : " + lng + " add success!!");

      xhr.open(
        "GET",
        "http://155.230.28.207:3000/camera_add?id=" +
          id +
          "&longitude=" +
          lng +
          "&latitude=" +
          lat,
        true
      );
      xhr.send();
      //alert(e.coord.lat());
    };
  }

  render() {
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
          onClick={(e) => this.clickMap(e)}
        ></NaverMap>

        <MenuBar
          homeImg={HomeImg}
          mapImg={MapImg}
          chartImg={CalImg}
          camImg={CamImg}
          logoutImg={LogoutImg}
        />
      </RenderAfterNavermapsLoaded>
    );
  }
}

export default getLocate;
