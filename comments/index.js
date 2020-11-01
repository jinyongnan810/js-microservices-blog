const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: Axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const newId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const commentsToBeUpdated = comments[req.params.id] || [];
  const newComment = { id: newId, content };
  commentsToBeUpdated.push(newComment);

  comments[req.params.id] = commentsToBeUpdated;

  // send to event bus
  const event = {
    type: "Comment-Created",
    content: { ...newComment, postId: req.params.id },
  };
  await Axios.post("http://localhost:4005/events", event);
  res.status(201).send(commentsToBeUpdated);
});

app.post("/events", (req, res) => {
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
