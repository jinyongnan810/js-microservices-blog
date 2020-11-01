const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = { items: [] };

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  id = randomBytes(4).toString("hex");
  const post = { id, title };
  posts["items"].push(post);

  // send to event bus
  const event = { type: "Post-Created", content: post };
  await axios.post("http://localhost:4005/events", event);
  res.status(201).send(post);
});

app.post("/events", (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
