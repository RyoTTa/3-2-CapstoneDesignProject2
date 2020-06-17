import React, { Component } from "react";
import "./App.css";
import DrawMap from "./map/drawMap";
import GetData from "./map/getData";
import Login from "./login/login";
import Signup from "./login/signup";
import HomePage from "./homepage/home";
import GetLocate from "./camera/getLocate";

const App = () => {
  //return <HomePage />;
  return <GetLocate />;
  //return <Login />;
};

/*class App extends Component {
  render() {
    return <div className="map"></div>;
  }
}*/

export default App;
