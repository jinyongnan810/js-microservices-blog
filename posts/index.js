const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = { items: [] };

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  id = randomBytes(4).toString("hex");
  const post = { id, title };
  posts["items"].push(post);
  res.status(201).send(post);
});

app.listen(4000, () => {
  console.log("Server running.");
});
