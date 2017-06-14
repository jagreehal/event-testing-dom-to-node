const express = require("express");
const app = express();

const store = [];

app.get("/", (req, res) => {
  res.json(store);
});

app.get("/reset", (req, res) => {
  store = [];
  res.send({});
});

app.get("/event", (req, res) => {
  store.push("x");
  res.send({});
});

module.exports = app;
