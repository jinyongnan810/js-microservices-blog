const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvents = (type, content) => {
  switch (type) {
    case "Post-Created":
      posts[content.id] = { ...content, comments: {} };
      break;
    case "Comment-Created":
    case "Comment-Updated":
      if (posts[content.postId]) {
        posts[content.postId].comments[content.id] = { ...content };
      }
      break;

    default:
      break;
  }
};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/events", (req, res) => {
  const event = req.body;
  const { type, content } = event;
  handleEvents(type, content);

  res.send({});
});

app.listen("4002", async () => {
  console.log("Listening on 4002");

  //fetching all the events
  const res = await axios.get("http://localhost:4005/events");
  res.data.map((event) => {
    handleEvents(event.type, event.content);
  });
});
