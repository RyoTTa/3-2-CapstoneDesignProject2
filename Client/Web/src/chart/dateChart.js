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
import MapImg from "../menuBar/icon/map_black.png";
import CalImg from "../menuBar/icon/calendar.png";
import LogoutImg from "../menuBar/icon/logout.png";
import CamImg from "../menuBar/icon/camera.png";

const colors = ["#58FA9E", "#4EDE63", "#7BF562", "#98DE4E", "#E4FA58"];

const data = [
  {
    name: "cam001",
    Count: 21,
  },
  {
    name: "cam002",
    Count: 30,
  },
  {
    name: "cam003",
    Count: 18,
  },
  {
    name: "cam004",
    Count: 20,
  },
  {
    name: "cam005",
    Count: 41,
  },
  {
    name: "cam006",
    Count: 25,
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
        <h1>2020-06-14 Detected Data</h1>
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
