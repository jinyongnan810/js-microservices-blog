const express = require("express");
const bodyParser = require("body-parser");
const { default: Axios } = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  await Axios.post("http://localhost:4000/events", event);
  await Axios.post("http://localhost:4001/events", event);
  await Axios.post("http://localhost:4002/events", event);
  res.send({});
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
