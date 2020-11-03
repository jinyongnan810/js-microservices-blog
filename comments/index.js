const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

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
  const newComment = { id: newId, content, status: "pending" };
  commentsToBeUpdated.push(newComment);

  comments[req.params.id] = commentsToBeUpdated;

  // send to event bus
  const event = {
    type: "Comment-Created",
    // actually query only needs the id and content, make sure to only send those when there are lots of properties
    content: { ...newComment, postId: req.params.id, status: "pending" },
  };
  await axios.post("http://event-bus-srv:4005/events", event);
  res.status(201).send(commentsToBeUpdated);
});

app.post("/events", async (req, res) => {
  const { type, content } = req.body;
  console.log("Received type:", type);
  switch (type) {
    case "Comment-Moderated":
      const { id, postId, status } = content;
      const comment = comments[postId].find((comment) => comment.id === id);
      comment.status = status;

      const updated = { content, type: "Comment-Updated" };
      await axios.post("http://event-bus-srv:4005/events", updated);
      break;
    default:
      break;
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
