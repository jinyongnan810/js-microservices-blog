const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, content } = req.body;
  console.log("Received type:", type);
  switch (type) {
    case "Comment-Created":
      setTimeout(async () => {
        const moderated = { content, type: "Comment-Moderated" };
        if (content.content.indexOf("orange") > -1) {
          moderated.content.status = "denied";
        } else {
          moderated.content.status = "approved";
        }
        await axios.post("http://localhost:4005/events", moderated);
      }, 5000);
      break;
    default:
      break;
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("moderation: Listening on 4003.");
});
