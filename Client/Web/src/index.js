import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./login/login";
import DrawMap from "./map/drawMap";
import SignUp from "./login/signup";
import Home from "./homepage/home";
import addCam from "./camera/getLocate";
import AuthRoute from "./authRoute";
import viewMapData from "./map/getData";
import DateChart from "./chart/dateChart";
import CamChart from "./chart/camChart";
import DelCam from "./camera/delCamera";
import getData from "./map/getData";

ReactDOM.render(
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  */

  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/drawMap" component={DrawMap} />
      <Route exact path="/loginPage" component={LoginPage} />
      <Route path="/signUpPage" component={SignUp} />
      <Route path="/addCamera" component={addCam} />
      <Route path="/viewMapData" component={viewMapData} />
      <Route path="/DateChart" component={DateChart} />
      <Route path="/CamChart" component={CamChart} />
      <Route path="/DelCam" component={DelCam} />
      <Route path="/GetData" component={getData} />
      <Redirect path="*" to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
