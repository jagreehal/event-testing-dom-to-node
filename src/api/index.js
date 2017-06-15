const express = require("express");
const app = express();
app.use(require("body-parser").json());

module.exports = function(store) {
  store = store || [];
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

  return app;
};
