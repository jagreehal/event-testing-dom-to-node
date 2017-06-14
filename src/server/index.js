const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const request = require("request");

const publicPath = path.join(__dirname, "../../public");
const tinyImage = fs.readFileSync(path.join(publicPath, "tiny.png"));

const apiServer = process.env.API_SERVER;

app.get("/record", (req, res) => {
  request.get(`${apiServer}/event`);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(tinyImage);
});

app.use(express.static(publicPath));

module.exports = app;
