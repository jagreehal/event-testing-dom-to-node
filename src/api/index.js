const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const store = [];

app.get("/:timestamp?", (req, res) => {
  if (req.params.timestamp) {
    let item = store.filter(i => i.timestamp === req.params.timestamp);
    return item.length ? res.json(item[0]) : res.json({});
  }
  res.json(store);
});

app.get("/reset", (req, res) => {
  store = [];
  res.send({});
});

app.post("/event", (req, res) => {
  let { name, timestamp } = req.body;
  store.push({ name, timestamp });
  res.send({});
});

module.exports = app;
