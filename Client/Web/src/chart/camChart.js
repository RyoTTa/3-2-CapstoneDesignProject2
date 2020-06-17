import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from "recharts";
import { render } from "@testing-library/react";
import "./chart.css";
import MenuBar from "../menuBar/menuBar";
import HomeImg from "../menuBar/icon/home.png";
import MapImg from "../menuBar/icon/map.png";
import CalImg from "../menuBar/icon/calendar_black.png";
import LogoutImg from "../menuBar/icon/logout.png";
import CamImg from "../menuBar/icon/camera.png";

const colors = ["#FAA8EF", "#D095DE", "#D5B1F5", "#A895DE", "#A8A9FA"];

const data = [
  {
    name: "05/30",
    Count: 35,
  },
  {
    name: "05/31",
    Count: 27,
  },
  {
    name: "06/01",
    Count: 29,
  },
  {
    name: "06/02",
    Count: 25,
  },
  {
    name: "06/03",
    Count: 38,
  },
  {
    name: "06/04",
    Count: 36,
  },
];

const dateChart = () => {
  return (
    <div>
      <MenuBar
        homeImg={HomeImg}
        mapImg={MapImg}
        chartImg={CalImg}
        camImg={CamImg}
        logoutImg={LogoutImg}
      />
      <div className="content">
        <h1>Cam004 Detected Data</h1>
        <BarChart width={1000} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Count" fill="#8884d8">
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              );
            })}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default dateChart;
