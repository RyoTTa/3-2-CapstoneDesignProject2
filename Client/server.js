const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "/images/1.png",
      camera: "#1",
      day: "2020-04-20",
      time: "14:20",
      count: "1",
    },
    {
      id: 2,
      image: "/images/2.png",
      camera: "#1",
      day: "2020-04-20",
      time: "14:21",
      count: "2",
    },
    {
      id: 3,
      image: "/images/3.jpg",
      camera: "#2",
      day: "2020-04-20",
      time: "14:20",
      count: "1",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
