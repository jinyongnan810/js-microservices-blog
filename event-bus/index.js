const express = require("express");
const bodyParser = require("body-parser");
const { default: Axios } = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Received type:", event.type);
  events.push(event);
  try {
    await Axios.post("http://post-clusterip-srv:4000/events", event);
  } catch (error) {
    console.log("Posts service down.");
  }
  try {
    await Axios.post("http://comments-srv:4001/events", event);
  } catch (error) {
    console.log("Comments service down.");
  }
  try {
    await Axios.post("http://query-srv:4002/events", event);
  } catch (error) {
    console.log("Query service down.");
  }
  try {
    await Axios.post("http://comment-moderation-srv:4003/events", event);
  } catch (error) {
    console.log("Moderation service down.");
  }
  res.send({});
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
