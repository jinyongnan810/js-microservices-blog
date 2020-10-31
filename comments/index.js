const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const newId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const commentsToBeUpdated = comments[req.params.id] || [];
  commentsToBeUpdated.push({ id: newId, content });

  comments[req.params.id] = commentsToBeUpdated;
  res.status(201).send(commentsToBeUpdated);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
